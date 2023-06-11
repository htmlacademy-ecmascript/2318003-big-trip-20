import {remove, render, RenderPosition} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../constant.js';

export default class AddNewPointPresenter {
  #listView = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #destinationsModel = null;
  #offersModel = null;

  #editPointComponent = null;

  constructor({listView, onDataChange, onDestroy, destinationsModel, offersModel}) {
    this.#listView = listView;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    const allDestinations = [...this.#destinationsModel.destinations];
    const allOffers = [...this.#offersModel.offers];

    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView({
      onFormSubmit: this.#handleFormSubmit,
      allDestinations: allDestinations,
      allOffers: allOffers,
      onDeleteClick: this.#handleDeleteClick,
      onCancelClick: this.#handleCancelClick,
      isCreatingMode: true
    });

    render(this.#editPointComponent, this.#listView, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#editPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
