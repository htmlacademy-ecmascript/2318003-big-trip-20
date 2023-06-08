import {render, remove, RenderPosition} from '../framework/render.js';
import {sortTypeTime, sortTypePrice, getFilterData} from '../utils.js';
import {SortType, UpdateType, UserAction, FilterType} from '../constant.js';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';

import PointPresenter from './point-presenter.js';
import AddNewPointPresenter from './add-new-point-presenter.js';

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

  #pointPresenters = new Map();
  #addNewPointPresenter = null;
  #newPointButtonComponent = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

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
      listView: this.#tripContainer,
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
        return filteredPoints;
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

    if (!this.points.length) {
      remove(this.#sortView);
      this.#renderEmpty();

      return;
    }

    this.#renderPoints();
    render(this.#newPointButtonComponent, this.#tripMain, RenderPosition.BEFOREEND);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addNewPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
      default:
        throw new Error(`Unknown User Action: '${UserAction}'!`);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
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
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedPointCount: true});
    this.#renderPoints();
    this.#removeSort();
    this.#renderSort();
  };


  #renderSort() {
    this.#sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      sortType: this.#currentSortType
    });

    render(this.#sortView, this.#listView.element, RenderPosition.AFTERBEGIN);
  }

  #removeSort() {
    remove(this.#sortView);
  }

  #renderEmpty() {
    this.#emptyView = new EmptyView({
      filterType: this.#filterType
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

  #clearBoard({resetRenderedPointCount = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#addNewPointPresenter.destroy();

    remove(this.#sortView);

    if (this.#emptyView) {
      remove(this.#emptyView);
    }

    if (resetRenderedPointCount) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    const points = this.points;

    if (points.length === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
  }
}
