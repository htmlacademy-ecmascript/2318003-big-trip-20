import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #listView = null;
  #point = null;
  #destinationsModel = null;
  #offersModel = null;

  #pointComponent = null;
  #editPointComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({listView, onDataChange, onModeChange, destinationsModel, offersModel}) {
    this.#listView = listView;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    this.#point = point;
    const destinationById = this.#destinationsModel.getById(this.#point.destination);
    const offersByType = this.#offersModel.getByType(this.#point.type);
    const allDestinations = [...this.#destinationsModel.destinations];
    const allOffers = [...this.#offersModel.offers];

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinationById: destinationById,
      offersByType: offersByType,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onCloseEditClick: this.#handleCloseCLick,
      allDestinations: allDestinations,
      allOffers: allOffers
    });

    render(this.#pointComponent, this.#listView.element);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#listView.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#closeForm();
    }
  };

  #replacePointToEditForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = Mode.DEFAULT;
  }

  #closeForm() {
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditClick = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleCloseCLick = () => {
    this.#closeForm();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#closeForm();
  };
}