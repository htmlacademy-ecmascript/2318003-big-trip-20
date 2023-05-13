import {filter} from '../utils.js';

const generateFilter = (points) => {
  const filters = filter(points);
  for (let i = 0; i < filter(points).length; i++) {
    filters[i].count = filters[i].filterPoints.length;
  }
  return filters;

};

export {generateFilter};
