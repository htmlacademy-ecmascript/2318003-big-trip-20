import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatStringToDateTime, capitalize} from '../utils.js';
import {WAYPOINT_TYPE, CITIES, POINT_EMPTY} from '../constant.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import he from 'he';

const createOffersTemplate = ({offer, point}) => {
  const {id, title, price} = offer;
  const {offers} = point;
  const isChecked = offers.includes(id) ? 'checked' : '';

  return (`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-${title}" ${isChecked}>
    <label class="event__offer-label" for="${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`);
};

const createEventTypeTemplate = (type) => {
  const value = capitalize(type);

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${value}</label>
    </div>`
  );
};

const createItemOfCitiesTemplate = (city) => `<option value=${city}></option>`;

const createItemOfPhotosTemplate = ({picture}) => {
  const {src, description} = picture;

  return (`<img class="event__photo" src=${src} alt=${description}>`);
};

const createPhotosMarkup = ({pointDestination}) => {
  const {pictures} = pointDestination;
  const photosMarkup = pictures.map((picture) => createItemOfPhotosTemplate({picture})).join('');

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosMarkup}
      </div>
    </div>`
  );
};

const createRollupTemplate = () => (
  `<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
);

const createEditPointTemplate = ({point, allDestinations, allOffers, isCreatingMode}) => {
  const {id, basePrice, dateFrom, dateTo, type, destination} = point;
  let pointDestination = '';
  if (destination) {
    pointDestination = allDestinations.find((wayPoint) => wayPoint.id === destination);
  }
  const eventTypeMarkup = WAYPOINT_TYPE.map(createEventTypeTemplate).join('');
  const citiesMarkup = CITIES.map((city) => createItemOfCitiesTemplate(city.name)).join('');
  const pointOffers = allOffers.find((offer) => offer.type === type).offers;
  const offersListMarkup = pointOffers.map((offer) => createOffersTemplate({offer, point})).join('');

  const destinationMarkup = (
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${pointDestination.description}</p>
      ${(isCreatingMode && destination) ? createPhotosMarkup({pointDestination}) : ''}
    </section>`
  );

  const createOffersMarkup = (offer) => {
    if (offer.length) {
      return (
        `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersListMarkup}
          </div>
        </section>`
      );
    }

    return '';
  };

  return (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${eventTypeMarkup}

            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${capitalize(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(`${(destination) ? pointDestination.name : ''}`)}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${citiesMarkup}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${formatStringToDateTime(dateFrom)}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${formatStringToDateTime(dateTo)}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">${basePrice}</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${he.encode(`${basePrice}`)}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${(isCreatingMode) ? 'cancel' : 'delete'}</button>
        ${(!isCreatingMode) ? createRollupTemplate() : ''}
      </header>
      <section class="event__details">

        ${createOffersMarkup(pointOffers)}

        ${(destination) ? destinationMarkup : ''}
      </section>
    </form>
  </li>`
  );
};
export default class EditPointView extends AbstractStatefulView{
  #allDestinations = null;
  #allOffers = null;
  #handleFormSubmit = null;
  #handleCloseEditClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;
  #isCreatingMode = null;
  #handleFormCancel = null;

  constructor({point = POINT_EMPTY, allDestinations, allOffers, onFormSubmit, onCloseEditClick = null, onDeleteClick, onCancelClick, isCreatingMode = false}) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseEditClick = onCloseEditClick;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleFormCancel = onCancelClick;
    this.#isCreatingMode = isCreatingMode;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate({
      point: this._state,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      isCreatingMode: this.#isCreatingMode
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    if (this.#isCreatingMode) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formCancelClickHandler);
    } else {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    }
    if (!this.#isCreatingMode) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditClickHandler);
    }
    this.element.querySelector('.event__type-btn').addEventListener('click', this.#chooseTripPointTypeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#chooseOfferHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #closeEditClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseEditClick();
  };

  #chooseTripPointTypeHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelector('.event__type-toggle').setAttribute('checked', 'true');
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#allDestinations.find((destination) => destination.name === evt.target.value);
    if (selectedDestination) {
      this.updateElement({
        destination: selectedDestination.id,
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #chooseOfferHandler = (evt) => {
    evt.preventDefault();
    const newOffer = evt.target.checked ? [...this._state.offers, evt.target.id] : this._state.offers.filter((offer) => offer !== evt.target.id);
    this.updateElement({
      offers: newOffer
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        'time_24hr': true,
      },
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        'time_24hr': true,
      },
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #formCancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormCancel();
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
