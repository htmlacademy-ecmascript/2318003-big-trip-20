import dayjs from 'dayjs';
import {DURATION, FilterType} from './constant.js';

import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween.js';
dayjs.extend(duration);
dayjs.extend(isBetween);

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const getDate = ({next}) => {
  let date = dayjs().subtract(getRandomInteger(0, DURATION.DAY), 'day');
  const minsGap = getRandomInteger(0, DURATION.MIN);
  const hoursGap = getRandomInteger(0, DURATION.HOUR);
  const daysGap = getRandomInteger(0, DURATION.DAY);

  if (next) {
    date = dayjs(date)
      .add(daysGap, 'day')
      .add(hoursGap, 'hour')
      .add(minsGap, 'minute');
  }

  return (date.toDate());
};

const humanizeDate = (date, dateFormat) => date ? dayjs(date).format(dateFormat) : '';

const formatStringToDateTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const formatStringToShortDate = (date) => dayjs(date).format('MMM DD');
const formatStringToTime = (date) => dayjs(date).format('HH:mm');

const calculateTimeDifference = (firstDate, secondDate) => {
  const gap = dayjs.duration(dayjs(secondDate).diff(dayjs(firstDate)), 'millisecond');

  let difference = '';

  if (+gap.format('D')) {
    difference += ` ${gap.format('DD[D]')}`;
  }

  if (+gap.format('H')) {
    difference += ` ${gap.format('HH[H]')}`;
  }

  return (difference += ` ${gap.format('mm[M]')}`);
};

const capitalize = (str) => (str[0].toUpperCase() + str.slice(1));

const randomBoolean = () => Math.random() >= 0.5;

const isPointFuture = (point) => dayjs().isBefore(dayjs(point.dateFrom));
const isPointPresent = (point) => dayjs().isBetween(dayjs(point.dateFrom), dayjs(point.dateTo));
const isPointPast = (point) => dayjs().isAfter(dayjs(point.dateTo));

const getFilterData = (points) => points.reduce((acc, point) => {
  if (isPointFuture(point)) {
    acc[[FilterType.FUTURE]].push(point);
  }
  if (isPointPresent(point)) {
    acc[[FilterType.PRESENT]].push(point);
  }
  if (isPointPast(point)) {
    acc[[FilterType.PAST]].push(point);
  }

  return acc;
}, {
  [FilterType.EVERYTHING]: points,
  [FilterType.FUTURE]: [],
  [FilterType.PRESENT]: [],
  [FilterType.PAST]: []
});

const sortTypeTime = (a, b) => {
  const durationA = dayjs.duration(dayjs(a.dateTo).diff(dayjs(a.dateFrom))).asMilliseconds();
  const durationB = dayjs.duration(dayjs(b.dateTo).diff(dayjs(b.dateFrom))).asMilliseconds();
  return durationB - durationA;
};

const sortTypePrice = (a, b) => b.basePrice - a.basePrice;

const updatePoint = (points, update) => points.map((point) => point.id === update.id ? update : point);

const filterPoints = (points) => Object.entries(getFilterData(points)).map(
  ([filterType, filteredPoints]) => ({
    type: filterType,
    count: filteredPoints.length,
  }),
);

const isPatchUpdate = (point, update) => (
  dayjs(point.dateFrom).isSame(dayjs(update.dateFrom)) &&
  dayjs(point.dateTo).isSame(dayjs(update.dateTo))
);

const getDateDiff = (dateOne, dateTwo) => dayjs(dateOne).unix() - dayjs(dateTwo).unix();

const sortByDate = (points) => points.sort((a, b) => getDateDiff(a.dateFrom, b.dateFrom));

export {
  getRandomArrayElement,
  getRandomInteger,
  getDate,
  formatStringToDateTime,
  formatStringToShortDate,
  formatStringToTime,
  calculateTimeDifference,
  capitalize,
  randomBoolean,
  isPointFuture,
  isPointPresent,
  isPointPast,
  getFilterData,
  updatePoint,
  sortTypeTime,
  sortTypePrice,
  filterPoints,
  isPatchUpdate,
  humanizeDate,
  sortByDate
};
