import AbstractView from '../framework/view/abstract-view.js';
import {formatStringToShortDate} from '../utils.js';

const findUniqueCities = ({points, allDestinations}) => {
  const uniqueCityIds = Array.from(new Set(points.map((point) => point.destination)));
  const uniqueCities = allDestinations
    .map((destination) => ((uniqueCityIds.includes(destination.id)) ? destination.name : ''))
    .filter((city) => (city !== ''));

  return uniqueCities;
};

const createWayPointMarkup = (uniqueCities) => {
  let wayPointMarkup = '';
  if (uniqueCities.length === 1) {
    wayPointMarkup = `${uniqueCities[0]}`;
  }

  if (uniqueCities.length === 2) {
    wayPointMarkup = `${uniqueCities[0]} &mdash; ${uniqueCities[1]}`;
  }

  if (uniqueCities.length === 3) {
    wayPointMarkup = `${uniqueCities[0]} &mdash; ${uniqueCities[1]} &mdash; ${uniqueCities[uniqueCities.length - 1]}`;
  }

  if (uniqueCities.length > 3) {
    wayPointMarkup = `${uniqueCities[0]} &mdash; ... &mdash; ${uniqueCities[uniqueCities.length - 1]}`;
  }

  return wayPointMarkup;
};

const createStartDateMarkup = (points) => formatStringToShortDate(points[0].dateFrom);

const createFinishDateMarkup = (points) => formatStringToShortDate(points[points.length - 1].dateFrom);

const calculateSummaryPrice = (points) => {
  const allPrices = points.map((point) => point.basePrice);
  const count = (arr) => arr.reduce((acc, num) => acc + num, 0);
  return count(allPrices);
};

const createHeaderTemplate = (points, allDestinations) => {
  const startDay = createStartDateMarkup(points);
  const finishDay = createFinishDateMarkup(points);
  const summaryPrice = calculateSummaryPrice(points);
  const uniqueCities = findUniqueCities({points, allDestinations});

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createWayPointMarkup(uniqueCities)}</h1>
        <p class="trip-info__dates">${startDay}&nbsp;&mdash;&nbsp;${finishDay}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${summaryPrice}</span>
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
