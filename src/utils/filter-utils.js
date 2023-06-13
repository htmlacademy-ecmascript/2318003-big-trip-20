import dayjs from 'dayjs';
import {FilterType} from '../constant.js';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween.js';
dayjs.extend(duration);
dayjs.extend(isBetween);


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

const filterPoints = (points) => Object.entries(getFilterData(points)).map(
  ([filterType, filteredPoints]) => ({
    type: filterType,
    count: filteredPoints.length,
  }),
);

export {
  getFilterData,
  filterPoints
};
