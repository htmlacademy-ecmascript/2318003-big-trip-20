import {createElement} from '../render.js';
import {formatStringToDateTime, capitalize} from '../utils.js';
import {WAYPOINT_TYPE, CITIES, POINT_EMPTY} from '../constant.js';

const createOffersTemplate = ({offer, point}) => {
  const {id, title, price} = offer;
  const {offers} = point;
  const isChecked = offers.includes(id) ? 'checked' : '';
  return (`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}" type="checkbox" name="event-offer-${title}" ${isChecked}>
    <label class="event__offer-label" for="event-offer-${title}-1">
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

const createEditPointTemplate = ({point, pointDestinations, pointOffers}) => {
  const {id, basePrice, dateFrom, dateTo, type, offers} = point;
  const {description, name} = pointDestinations;
  const eventTypeMarkup = WAYPOINT_TYPE.map(createEventTypeTemplate).join('');
  const citiesMarkup = CITIES.map(createItemOfCitiesTemplate).join('');

  const offersListMarkup = pointOffers.map((offer) => createOffersTemplate({offer, point})).join('');

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
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${name} list="destination-list-1">
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
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
      </header>
      <section class="event__details">

        ${createOffersMarkup(offers)}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
        </section>
      </section>
    </form>
  </li>`
  );
};
export default class EditPointView {

  constructor({point = POINT_EMPTY, pointDestinations, pointOffers}) {
    this.point = point;
    this.pointDestinations = pointDestinations;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createEditPointTemplate({
      point: this.point,
      pointDestinations: this.pointDestinations,
      pointOffers: this.pointOffers
    });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
