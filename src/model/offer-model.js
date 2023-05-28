export default class OffersModel {
  #service;
  #offers;

  constructor(service) {
    this.#service = service;
    this.#offers = this.#service.getOffers();
  }

  get offers() {
    return this.#offers;
  }

  /* getById(id) {
    return this.#offers
      .find((offer) => offer.id === id);
  } */

  getByType(type) {
    return this.#offers
      .find((offer) => offer.type === type).offers;
  }
}
