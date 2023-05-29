export default class DestinationsModel {
  #service;
  #destinations;

  constructor(service) {
    this.#service = service;
    this.#destinations = this.#service.getDestinations();
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations
      .find((destination) => destination.id === id);
  }

  getByName(name) {
    return this.#destinations
      .find((destination) => destination.name === name);
  }
}
