import dayjs from 'dayjs';

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
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().add(1, 'day').toDate(),
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

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const HEADER_POINT_COUNT = 3;

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
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
  SortType,
  HEADER_POINT_COUNT,
  UserAction,
  UpdateType
};
