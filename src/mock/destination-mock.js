import {getRandomArrayElement} from '../utils.js';
import {CITIES, CITY_DESCRIPTION} from '../constant.js';

const generateDestination = () => {
  const city = getRandomArrayElement(CITIES);

  return {
    id: crypto.randomUUID(),
    name: city,
    description: CITY_DESCRIPTION,
    pictures: [
      {
        'src': `https://loremflickr.com/248/152?random=${crypto.randomUUID()}`,
        'description': `${city} description`
      }
    ]
  };
};

export {generateDestination};
