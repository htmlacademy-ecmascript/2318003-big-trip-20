import {render, remove, RenderPosition} from '../framework/render.js';
import {sortByDate, sortTypeTime, sortTypePrice} from '../utils/sort-utils.js';
import {getFilterData} from '../utils/filter-utils.js';
import {SortType, UpdateType, UserAction, FilterType} from '../constant.js';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';

import PointPresenter from './point-presenter.js';
import AddNewPointPresenter from './add-new-point-presenter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #listView = new TripEventsListView();

  #tripContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;
  #tripMain = null;

  #sortView = null;
  #emptyView = null;
  #isLoading = true;

  #pointPresenters = new Map();
  #addNewPointPresenter = null;
  #newPointButtonComponent = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({tripContainer, tripMain, destinationsModel, offersModel, pointsModel, filterModel}) {
    this.#tripContainer = tripContainer;
    this.#tripMain = tripMain;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    const handlePointButtonClick = () => {
      this.createPoint();
      this.#newPointButtonComponent.element.disabled = true;
    };

    const handlePointFormClose = () => {
      this.#newPointButtonComponent.element.disabled = false;
    };

    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: handlePointButtonClick,
    });

    this.#addNewPointPresenter = new AddNewPointPresenter({
      listView: this.#listView.element,
      onDataChange: this.#handleViewAction,
      onDestroy: handlePointFormClose,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = getFilterData(points)[this.#filterType];

    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...sortByDate(filteredPoints)];
      case SortType.TIME:
        return filteredPoints.sort(sortTypeTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortTypePrice);
      default:
        throw new Error(`Unknown Sort Type: '${this.#currentSortType}'!`);
    }

  }

  init() {
    this.#renderSort();
    render(this.#newPointButtonComponent, this.#tripMain, RenderPosition.BEFOREEND);
    this.#renderPoints();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addNewPointPresenter.init();
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#addNewPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#addNewPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      default:
        throw new Error(`Unknown User Action: '${UserAction}'!`);
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard({resetSortType: false});
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      default:
        throw new Error(`Unknown Update Type: '${updateType}'!`);
    }
  };

  #handleModeChange = () => {
    this.#addNewPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };


  #renderSort() {
    this.#sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      sortType: this.#currentSortType
    });

    render(this.#sortView, this.#listView.element, RenderPosition.BEFOREBEGIN);
  }

  #renderEmpty() {
    this.#emptyView = new EmptyView({
      filterType: this.#filterType,
      isLoading: this.#isLoading,
    });

    render(this.#emptyView, this.#tripContainer);
  }

  #renderPoints() {
    render(this.#listView, this.#tripContainer);
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      listView: this.#listView,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearBoard(resetSortType = false) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#addNewPointPresenter.destroy();

    remove(this.#sortView);

    if (this.#emptyView) {
      remove(this.#emptyView);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    const points = this.points;

    if (points.length === 0 || this.#isLoading) {
      this.#renderEmpty();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }
}
