import {getFilterData} from '../utils.js';

const generateFilter = (points) => Object.entries(getFilterData(points)).map(
  ([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints.length,
  }),
);

export {generateFilter};
