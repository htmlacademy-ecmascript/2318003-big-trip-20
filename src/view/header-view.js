import AbstractView from '../framework/view/abstract-view.js';
import {formatStringToShortDate} from '../utils.js';
import {HEADER_POINT_COUNT} from '../constant.js';

const findCities = ({points, allDestinations}) => {
  const cityIds = points.map((point) => point.destination);
  const getNameById = (id) => allDestinations.find((destination) => destination.id === id).name;

  return (cityIds.map(getNameById));
};

const createWayPointMarkup = (uniqueCities) => {
  if (uniqueCities.length < HEADER_POINT_COUNT) {
    return (`${uniqueCities.join(' &mdash; ')}`);
  }

  if (uniqueCities.length === HEADER_POINT_COUNT) {
    return (`${uniqueCities[0]} &mdash; ${uniqueCities[1]} &mdash; ${uniqueCities.at(-1)}`);
  }

  if (uniqueCities.length > 3) {
    return (`${uniqueCities[0]} &mdash; ... &mdash; ${uniqueCities.at(-1)}`);
  }
};

const createStartDateMarkup = (points) => formatStringToShortDate(points[0].dateFrom);

const createFinishDateMarkup = (points) => formatStringToShortDate(points.at(-1).dateFrom);

const calculateSummaryPrice = (points) => points.reduce((acc, point) => acc + point.basePrice, 0);

const createHeaderTemplate = (points, allDestinations) => {
  const startDay = createStartDateMarkup(points);
  const finishDay = createFinishDateMarkup(points);
  const uniqueCities = findCities({points, allDestinations});

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createWayPointMarkup(uniqueCities)}</h1>
        <p class="trip-info__dates">${startDay}&nbsp;&mdash;&nbsp;${finishDay}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateSummaryPrice(points)}</span>
      </p>
    </section>`);
};

export default class HeaderView extends AbstractView{
  #points = null;
  #allDestinations = null;

  constructor({points, allDestinations}) {
    super();
    this.#points = points;
    this.#allDestinations = allDestinations;
  }

  get template() {
    return createHeaderTemplate(this.#points, this.#allDestinations);
  }
}
