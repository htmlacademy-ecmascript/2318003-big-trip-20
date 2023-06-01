import {render, remove, RenderPosition} from '../framework/render.js';
import {updatePoint, sortTypeTime, sortTypePrice} from '../utils.js';
import {SortType} from '../constant.js';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';

import TripEventsListView from '../view/trip-events-list-view.js';
import PointPresenter from './point-presenter.js';

export default class TripPresenter {
  #listView = new TripEventsListView();

  #tripContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  #sortView = null;
  #updatedSortView = null;

  #emptyView = new EmptyView();

  #points = [];
  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #sourceTripPoints = [];

  constructor({tripContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...this.#pointsModel.points];
  }

  init() {
    this.#sourceTripPoints = [...this.#pointsModel.points];
    this.#renderSort();

    if (!this.#points.length) {
      remove(this.#sortView);
      this.#renderEmpty();

      return;
    }

    this.#renderPoints();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#sourceTripPoints = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).
      init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#points.sort(sortTypeTime);
        break;

      case SortType.PRICE:
        this.#points.sort(sortTypePrice);
        break;

      case SortType.DAY:
        this.#points = [...this.#sourceTripPoints];
        break;

      default:
        throw new Error(`Unknown Sort Type: '${sortType}'!`);
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPoints();
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
    render(this.#emptyView, this.#tripContainer);
  }

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints() {
    render(this.#listView, this.#tripContainer);
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      listView: this.#listView,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
