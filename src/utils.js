import dayjs from 'dayjs';
import {DURATION, MSECONDS_PER_DAY, MSECONDS_PER_HOUR, MSECONDS_PER_MINUTE} from './constant.js';


const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const getDate = ({next}) => {
  let date = dayjs().subtract(getRandomInteger(0, DURATION.DAY), 'day').toDate();
  const minsGap = getRandomInteger(0, DURATION.MIN);
  const hoursGap = getRandomInteger(0, DURATION.HOUR);
  const daysGap = getRandomInteger(0, DURATION.DAY);

  if (next) {
    date = dayjs(date)
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .add(daysGap, 'day')
      .toDate();
  }
  return (date);
};

const formatStringToDateTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const formatStringToShortDate = (date) => dayjs(date).format('MMM DD');
const formatStringToTime = (date) => dayjs(date).format('HH:mm');

const calculateTimeDifference = (firstDate, secondDate) => {
  const convertDate = (string) => new Date(0, 0,0, string.split(':')[0], string.split(':')[1]);
  const different = (convertDate(secondDate) - convertDate(firstDate));

  const hours = Math.floor((different % MSECONDS_PER_DAY) / MSECONDS_PER_HOUR);
  const minutes = Math.round(((different % MSECONDS_PER_DAY) % MSECONDS_PER_HOUR) / MSECONDS_PER_MINUTE);
  let result;
  if (+hours) {
    result = `${hours}H ${minutes}M`;
  } else {
    result = `${minutes}M`;
  }

  return(result);
};

const capitalize = (str) => (str[0].toUpperCase() + str.slice(1));

export {getRandomArrayElement, getRandomInteger, getDate, formatStringToDateTime, formatStringToShortDate, formatStringToTime, calculateTimeDifference, capitalize};
