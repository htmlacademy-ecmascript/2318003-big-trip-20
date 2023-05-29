const WAYPOINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const CITIES = [
  {
    name: 'Chamonix',
    description: 'Chamonix description'
  },
  {
    name: 'Geneva',
    description: 'Geneva description'
  },
  {
    name: 'Amsterdam',
    description: 'Amsterdam description'
  },
  {
    name: 'Moscow',
    description: 'Moscow description'
  },
  {
    name: 'Saint-Petersburg',
    description: 'Saint-Petersburg description'
  }
];

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
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};


export {
  WAYPOINT_TYPE,
  CITIES,
  PRICE,
  DURATION,
  DESTINATION_COUNT,
  OFFER_COUNT,
  POINT_COUNT,
  POINT_EMPTY,
  FilterType,
  FilterEmptyMessage,
  SortType
};
