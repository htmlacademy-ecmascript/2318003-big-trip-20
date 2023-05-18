import {render, remove} from '../framework/render.js';
import {updatePoint} from '../utils.js';

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

  #sortView = new SortView;
  #emptyView = new EmptyView();

  #points = [];
  #pointPresenters = new Map();

  constructor({tripContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...this.#pointsModel.points];
  }

  init() {

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

  #renderSort() {
    render(this.#sortView, this.#tripContainer);
  }

  #renderEmpty() {
    render(this.#emptyView, this.#tripContainer);
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
