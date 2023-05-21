import {render, remove, RenderPosition} from '../framework/render.js';
import {updatePoint} from '../utils.js';
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
      init({
        point: updatedPoint,
        pointDestinations: this.#destinationsModel.getById(updatedPoint.destination),
        pointOffers: this.#offersModel.getByType(updatedPoint.type)
      });
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:

        this.#points.sort((a, b) => {
          const durationA = dayjs.duration(dayjs(a.dateTo).diff(dayjs(a.dateFrom))).asMilliseconds();
          const durationB = dayjs.duration(dayjs(b.dateTo).diff(dayjs(b.dateFrom))).asMilliseconds();
          return durationB - durationA;
        });
        break;

      case SortType.PRICE:
        this.#points.sort((a, b) => b.basePrice - a.basePrice);
        break;
      default: this.#points = [...this.#sourceTripPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortView = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortView, this.#listView.element, RenderPosition.AFTERBEGIN);
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
      this.#renderPoint({
        point,
        pointDestinations: this.#destinationsModel.getById(point.destination),
        pointOffers: this.#offersModel.getByType(point.type)
      });
    });
  }

  #renderPoint({point, pointDestinations, pointOffers}) {
    const pointPresenter = new PointPresenter({
      listView: this.#listView,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init({point, pointDestinations, pointOffers});
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
