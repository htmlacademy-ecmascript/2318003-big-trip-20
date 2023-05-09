import {
  getRandomInteger,
  getDate,
  randomBoolean
} from '../utils.js';
import {PRICE} from '../constant.js';

const generatePoint = (type, destinationId, offerIds) => (
  {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(PRICE.MIN, PRICE.MAX),
    dateFrom: getDate({next: false}),
    dateTo: getDate({next: true}),
    destination: destinationId,
    isFavorite: randomBoolean(),
    offers: offerIds,
    type
  }
);

export {generatePoint};
