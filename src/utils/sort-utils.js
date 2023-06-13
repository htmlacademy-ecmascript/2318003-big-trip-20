import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import {getDateDiff} from './data-utils.js';

const sortTypeTime = (a, b) => {
  const durationA = dayjs.duration(dayjs(a.dateTo).diff(dayjs(a.dateFrom))).asMilliseconds();
  const durationB = dayjs.duration(dayjs(b.dateTo).diff(dayjs(b.dateFrom))).asMilliseconds();
  return durationB - durationA;
};

const sortTypePrice = (a, b) => b.basePrice - a.basePrice;

const sortByDate = (points) => points.sort((a, b) => getDateDiff(a.dateFrom, b.dateFrom));

export {
  sortTypeTime,
  sortTypePrice,
  sortByDate
};
