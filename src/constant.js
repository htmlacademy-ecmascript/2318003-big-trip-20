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

const filterType = [
  {
    type: 'everything',
    message: 'Click New Event to create your first point',
  },
  {
    type: 'future',
    message: 'There are no future events now',
  },
  {
    type: 'present',
    message: 'There are no present events now',
  },
  {
    type:'past',
    message: 'There are no past events now',
  }
];


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
  filterType,
};
