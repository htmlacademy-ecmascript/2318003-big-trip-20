import {humanizeDate, sortByDate} from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';

import dayjs from 'dayjs';

function createTripInfoTemplate({points, intialDestination, finalDestination, shortPoints, intialDate, finalDate, totalPrice}) {
  return (
    `<section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
         <h1 class="trip-info__title">${points.length > 3 ? `${intialDestination ? intialDestination : ''} &mdash; . . . &mdash; ${finalDestination ? finalDestination : ''}` : shortPoints.join(' &mdash; ')}</h1>

         <p class="trip-info__dates">${intialDate}&nbsp;&mdash;&nbsp;${finalDate}</p>
       </div>

       <p class="trip-info__cost">
         Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice ? totalPrice : ''}</span>
       </p>
     </section>`
  );
}

export default class HeaderView extends AbstractView {
  #destinationsModel = null;
  #pointsModel = null;
  #offersModel = null;

  constructor({destinationsModel, pointsModel, offersModel}) {
    super();
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
  }

  get template() {
    const points = this.#pointsModel.points;
    const shortPoints = sortByDate(points).map((point) => this.#destinationsModel.getById(point.destination)?.name);

    const intialDestination = this.#destinationsModel.getById(points[0]?.destination)?.name;
    const finalDestination = this.#destinationsModel.getById(points.at(-1)?.destination)?.name;

    const isSameMonth = dayjs(points[0]?.dateFrom).month() === dayjs(points.at(-1)?.dateTo).month();
    const intialDate = humanizeDate(points[0]?.dateFrom, `${isSameMonth ? 'MMM D' : 'D MMM'}`);
    const finalDate = humanizeDate(points.at(-1)?.dateTo, `${isSameMonth ? 'D' : 'D MMM'}`);

    const totalPrice = points?.reduce((total, point) => {
      const checkedOffers = this.#offersModel.getById(point.type, point.offers);
      const checkedOffersPrice = checkedOffers?.reduce((sum, checkedOffer) => sum + checkedOffer.price, 0);
      total += checkedOffersPrice + point.basePrice;
      return total;
    }, 0);

    return createTripInfoTemplate({points, intialDestination, finalDestination, shortPoints, intialDate, finalDate, totalPrice});
  }
}
