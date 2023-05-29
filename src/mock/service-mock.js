import {
  WAYPOINT_TYPE,
  CITIES,
  OFFER_COUNT,
  POINT_COUNT
} from '../constant.js';

import {getRandomArrayElement, getRandomInteger, randomBoolean} from '../utils.js';
import {generateDestination} from './destination-mock.js';
import {generatePoint} from './point-mock.js';
import {generateOffer} from './offer-mock.js';

export default class MockService {
  destinations = [];
  offers = [];
  points = [];

  constructor() {
    this.destinations = this.generateDestinations();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  generateDestinations() {
    return CITIES.map(generateDestination);
  }

  generateOffers() {
    return WAYPOINT_TYPE.map((type) => ({
      type,
      offers: Array.from({length: OFFER_COUNT}, () => generateOffer(type))
    }));
  }

  generatePoints() {
    return Array.from(
      {length: getRandomInteger(0, POINT_COUNT)},
      () => {
        const type = getRandomArrayElement(WAYPOINT_TYPE);
        const destination = getRandomArrayElement(this.destinations);

        const hasOffers = randomBoolean();

        const offersByType = this.offers.find((offerByType) => offerByType.type === type);

        const offersIds = (hasOffers) ? offersByType.offers.slice(0, getRandomInteger(0, OFFER_COUNT)).map((offer) => offer.id) : [];

        return generatePoint(type, destination.id, offersIds);
      }
    );
  }
}
