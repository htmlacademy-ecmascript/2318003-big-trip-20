import Observable from '../framework/observable.js';
import {UpdateType} from '../constant.js';

export default class OffersModel extends Observable{
  #offers = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  getById(type, ids) {
    return this.getByType(type)?.filter((offer) => ids.includes(offer.id));
  }

  getByType(type) {
    const offersByType = this.#offers.find((offer) => offer.type === type);

    if (offersByType) {
      return offersByType.offers;
    }
  }

  async init() {
    try {
      this.#offers = await this.#pointsApiService.offers;
    } catch (err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  }
}
