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
    const points = this.#pointsModel.points;
    const allDestinations = this.#destinationsModel.destinations;
    const summaryPrice = this.#getSummaryPrice();


    this.#headerComponent = new HeaderView({
      points: points,
      allDestinations: allDestinations,
      summaryPrice: summaryPrice
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

  #getSummaryPrice () {
    const allOffers = this.#offersModel.offers;

    return this.#pointsModel.points.reduce((pointAcc, curPoint) => {
      const offersByType = allOffers.find((offer) => offer.type === curPoint.type).offers;

      const offersTotal = offersByType.reduce((offerAcc, curOffer) => {
        if (curPoint.offers.includes(curOffer.id)) {
          offerAcc += curOffer.price;
        }

        return offerAcc;
      }, 0);
      pointAcc += offersTotal + curPoint.basePrice;

      return pointAcc;
    }, 0);
  }
}
