import {RenderPosition, render, remove, replace} from '../framework/render.js';
import HeaderView from '../view/header-view.js';

export default class HeaderPresenter {
  #tripMainContainer = null;

  #destinationsModel = null;
  #pointsModel = null;
  #offersModel = null;

  #headerComponent = null;

  constructor({tripMainContainer, destinationsModel, pointsModel, offersModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    if (this.#pointsModel.points.length) {
      this.#renderHeader();
    } else {
      this.#destroyHeader();
    }
  }

  #renderHeader() {
    const prevHeaderComponent = this.#headerComponent;
    const points = [...this.#pointsModel.points];
    const allDestinations = [...this.#destinationsModel.destinations];
    const summaryCheckedOffersPrice = this.#getSummaryCheckedOffersPrice();
    const summaryBasePrice = this.#getSummaryBasePrice();


    this.#headerComponent = new HeaderView({
      points: points,
      allDestinations: allDestinations,
      summaryBasePrice: summaryBasePrice,
      summaryCheckedOffersPrice: summaryCheckedOffersPrice
    });

    if (prevHeaderComponent === null) {
      render(this.#headerComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#headerComponent, prevHeaderComponent);
    remove(prevHeaderComponent);
  }

  #destroyHeader() {
    remove(this.#headerComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #getSummaryBasePrice () {
    return this.#pointsModel.points.reduce((accumulator, currentValue) => accumulator + currentValue.basePrice, 0);
  }

  #getSummaryCheckedOffersPrice () {
    const allOffers = [...this.#offersModel.offers];
    const getOfferPriceById = (id, type) => {
      const offersByType = allOffers.find((offer) => offer.type === type).offers;
      return offersByType.find((offer) => offer.id === id).price;
    };
    return this.#pointsModel.points.
      map((point) => point.offers.length ? point.offers.map((offer) => getOfferPriceById(offer, point.type)) : []).
      reduce((a, b) => a.concat(b)).
      reduce((a, b) => a + b);
  }
}
