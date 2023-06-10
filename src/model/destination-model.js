import Observable from '../framework/observable.js';
import {UpdateType} from '../constant.js';

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

  getByName(name) {
    return this.#destinations
      .find((destination) => destination.name === name);
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }
}
