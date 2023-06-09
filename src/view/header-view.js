import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDate} from '../utils/data-utils.js';
import {HEADER_POINT_COUNT} from '../constant.js';

import dayjs from 'dayjs';

const findCities = ({points, allDestinations}) => {
  const cityIds = points.map((point) => point.destination);
  const getNameById = (id) => allDestinations.find((destination) => destination.id === id).name;

  return (cityIds.map(getNameById));
};

const createWayPointMarkup = (allCities) => {
  if (allCities.length <= HEADER_POINT_COUNT) {
    return (`${allCities.join(' &mdash; ')}`);
  }

  return (`${allCities[0]} &mdash; ... &mdash; ${allCities.at(-1)}`);

};

const isSameMonth = (points) => dayjs(points[0]?.dateFrom).month() === dayjs(points.at(-1)?.dateFrom).month();

const createStartDateMarkup = (points) => humanizeDate(points[0]?.dateFrom, `${isSameMonth(points) ? 'MMM D' : 'D MMM'}`);

const createFinishDateMarkup = (points) => humanizeDate(points.at(-1)?.dateFrom, `${isSameMonth(points) ? 'D' : 'D MMM'}`);

const createHeaderTemplate = (points, allDestinations, summaryPrice) => {
  const startDay = createStartDateMarkup(points);
  const finishDay = createFinishDateMarkup(points);
  const allCities = findCities({points, allDestinations});


  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${createWayPointMarkup(allCities)}</h1>
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
  #summaryPrice = null;

  constructor({points, allDestinations, summaryPrice}) {
    super();
    this.#points = points;
    this.#allDestinations = allDestinations;
    this.#summaryPrice = summaryPrice;
  }

  get template() {
    return createHeaderTemplate(this.#points, this.#allDestinations, this.#summaryPrice);
  }
}
