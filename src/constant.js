const WAYPOINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITIES = ['Chamonix', 'Geneva', 'Amsterdam', 'Moscow', 'Saint-Petersburg'];

const CITY_DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const PRICE = {
  MIN: 100,
  MAX:1000
};

const DURATION = {
  HOUR: 24,
  DAY: 3,
  MIN: 59
};

const DESTINATION_COUNT = 5;

const OFFER_COUNT = 6;

const POINT_COUNT = 7;

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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const FilterEmptyMessage = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now'
};


export {
  WAYPOINT_TYPE,
  CITIES,
  CITY_DESCRIPTION,
  PRICE,
  DURATION,
  DESTINATION_COUNT,
  OFFER_COUNT,
  POINT_COUNT,
  POINT_EMPTY,
  FilterType,
  FilterEmptyMessage
};
