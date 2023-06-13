import dayjs from 'dayjs';

const WAYPOINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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
  INIT: 'INIT',
};

export {
  WAYPOINT_TYPE,
  POINT_EMPTY,
  FilterType,
  SortType,
  HEADER_POINT_COUNT,
  UserAction,
  UpdateType
};
