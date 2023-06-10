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
  }

  init() {
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  #renderHeader() {
    const prevHeaderComponent = this.#headerComponent;

    this.#headerComponent = new HeaderView({
      destinationsModel: this.#destinationsModel,
      pointsModel: this.#pointsModel,
      offersModel: this.#offersModel,
    });

    if (prevHeaderComponent === null) {
      render(this.#headerComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#headerComponent, prevHeaderComponent);
    remove(prevHeaderComponent);
  }

  #handleModelEvent = () => {
    this.#renderHeader();
  };
}
