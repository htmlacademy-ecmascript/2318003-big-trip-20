import {getRandomInteger, getDate} from '../utils.js';
import {PRICE} from '../constant.js';

function generatePoint(type, destinationId, offerIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PRICE.MIN, PRICE.MAX),
    dateFrom: getDate({next: false}),
    dateTo: getDate({next: true}),
    destination: destinationId,
    isFavorite: !!getRandomInteger(),
    offers: offerIds,
    type
  };
}


export {generatePoint};
