import {render, replace} from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import EmptyView from '../view/list-empty-view.js';

import TripEventsListView from '../view/trip-events-list-view.js';

export default class TripPresenter {
  #listView = new TripEventsListView();

  #tripContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;

  #points = [];

  constructor({tripContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...this.#pointsModel.points];
  }

  init() {
    if (!this.#points.length) {
      render(new EmptyView(), this.#tripContainer);
    } else {
      render(new SortView(), this.#tripContainer);
      render(this.#listView, this.#tripContainer);
      this.#points.forEach((point) => {
        this.#renderPoint({
          point,
          pointDestination: this.#destinationsModel.getById(point.destination),
          pointOffer: this.#offersModel.getByType(point.type)
        });
      });
    }
  }

  #renderPoint({point, pointDestination, pointOffer}) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeForm();
      }
    };

    const pointComponent = new PointView({
      point,
      pointDestination,
      pointOffer,
      onEditClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point,
      pointDestination,
      pointOffer,
      onFormSubmit: () => {
        closeForm();
      },
      onCloseEditClick: () => {
        closeForm();
      }
    });

    function replacePointToEditForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, editPointComponent);
    }

    function closeForm() {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointComponent, this.#listView.element);
  }


}
