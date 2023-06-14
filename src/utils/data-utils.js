import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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

const getDateDiff = (dateOne, dateTwo) => dayjs(dateOne).unix() - dayjs(dateTwo).unix();

const isPatchUpdate = (point, update) => (
  (dayjs(point.dateFrom).isSame(update.dateFrom) && dayjs(point.dateTo).isSame(update.dateTo)) &&
  (point.basePrice === update.basePrice)
);

const isNotCorrectDateFrom = (dateTo, userData) => dayjs(dateTo).isBefore(dayjs(userData)) || dayjs(dateTo).isSame(userData);

export {
  humanizeDate,
  formatStringToDateTime,
  formatStringToShortDate,
  formatStringToTime,
  calculateTimeDifference,
  getDateDiff,
  isPatchUpdate,
  isNotCorrectDateFrom
};
