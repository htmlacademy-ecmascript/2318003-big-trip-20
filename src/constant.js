const WAYPOINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];


const CITIES = ['Chamonix', 'Geneva', 'Amsterdam', 'Moscow', 'Saint-Petersburg'];

const CITY_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const PRICE = {
  MIN: 100,
  MAX:1000
};

const DURATION = {
  HOUR: 3,
  DAY: 5,
  MIN: 38
};

const DESTINATION_COUNT = 5;

const OFFER_COUNT = 6;

const POINT_COUNT = 7;

const MSECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const MSECONDS_PER_DAY = MSECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY;
const MSECONDS_PER_HOUR = MSECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const MSECONDS_PER_MINUTE = MSECONDS_PER_SECOND * SECONDS_PER_MINUTE;

const DEFAULT_TYPE = 'flight';

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};

export {WAYPOINT_TYPE, CITIES, CITY_DESCRIPTION, PRICE, DURATION, DESTINATION_COUNT, OFFER_COUNT, POINT_COUNT, MSECONDS_PER_DAY, MSECONDS_PER_HOUR, MSECONDS_PER_MINUTE, POINT_EMPTY};
