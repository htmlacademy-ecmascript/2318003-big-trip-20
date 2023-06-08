import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #service;
  #points;

  constructor(service) {
    super();
    this.#service = service;
    this.#points = this.#service.getPoints();
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    this.#checkPointExist(update, 'update');

    this.#points.map((point) => (point.id === update.id) ? update : point);

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    this.#checkPointExist(update, 'delete');

    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType);
  }

  #checkPointExist(update, type) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't ${type} unexisting point`);
    }
  }
}
