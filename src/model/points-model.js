export default class PointsModel {
  #service;
  #points;

  constructor(service) {
    this.#service = service;
    this.#points = this.#service.getPoints();
  }

  get points() {
    return this.#points;
  }
}
