import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable{
  #destinations = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations
      .find((destination) => destination.id === id);
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
    } catch (err) {
      throw new Error ('Something went wrong while loading destinations...');
    }
  }
}
