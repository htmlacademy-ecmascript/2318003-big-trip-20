import dayjs from 'dayjs';
import {DURATION} from './constant.js';

import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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

const formatStringToDateTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const formatStringToShortDate = (date) => dayjs(date).format('MMM DD');
const formatStringToTime = (date) => dayjs(date).format('HH:mm');

const calculateTimeDifference = (firstDate, secondDate) => {
  const gap = dayjs.duration(dayjs(secondDate).diff(dayjs(firstDate)), 'millisecond');

  let differnese = '';

  if (+gap.format('D')) {
    differnese += ` ${gap.format('DD[D]')}`;
  }

  if (+gap.format('H')) {
    differnese += ` ${gap.format('HH[H]')}`;
  }

  return (differnese += ` ${gap.format('mm[M]')}`);
};

const capitalize = (str) => (str[0].toUpperCase() + str.slice(1));

const randomBoolean = () => Math.random() >= 0.5;

export {
  getRandomArrayElement,
  getRandomInteger,
  getDate,
  formatStringToDateTime,
  formatStringToShortDate,
  formatStringToTime,
  calculateTimeDifference,
  capitalize,
  randomBoolean
};
