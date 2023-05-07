const WAYPOINT_TYPE = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const DESTINATION = [
  {
    'id': '1',
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'name': 'Chamonix',
    'pictures': [{
      'src': 'https://loremflickr.com/248/152?random=1',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }]
  },
  {
    'id': '2',
    'description': 'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'name': 'Geneva',
    'pictures': [{
      'src': 'https://loremflickr.com/248/152?random=2',
      'description': 'Cras aliquet varius magna, non porta ligula feugiat eget.'
    }]
  },
  {
    'id': '3',
    'description': 'Fusce tristique felis at fermentum pharetra.',
    'name': 'Amsterdam',
    'pictures': [{
      'src': 'https://loremflickr.com/248/152?random=3',
      'description': 'Fusce tristique felis at fermentum pharetra.'
    }]
  },
];

const renderOffers = (points) => {
  const offers = [];
  let j = 0;
  for (let i = 0; i < points.length; i++) {
    offers.push({
      'type': points[i],
      'offers': [
        {
          'id': j + 1,
          'title': 'Upgrade 1',
          'price': 100
        },
        {
          'id': j + 2,
          'title': 'Upgrade 2',
          'price': 200
        },
        {
          'id': j + 3,
          'title': 'Upgrade 3',
          'price': 300
        },
      ]
    });
    j = j + 3;
  }
  return offers;
};

const OFFERS = renderOffers(WAYPOINT_TYPE);

const findCurrentId = (array) => {
  const currentTypeOfferIds = [];
  for (let i = 0; i < array.length; i++) {
    currentTypeOfferIds.push(array[i]['id']);
  }
  return currentTypeOfferIds;
};

const getRandomPoint = () => {
  const currentType = getRandomArrayElement(WAYPOINT_TYPE);
  const curentTypeOffer = OFFERS.find((offer) => offer.type === currentType).offers;

  const pointMock = {
    'wayType': currentType,
    'destination': getRandomArrayElement(DESTINATION),
    'startTime': '',
    'endTime': '',
    'price': '',
    'offers': findCurrentId(curentTypeOffer),
  };

  return pointMock;
};

const POINT_COUNT = 5;

const testValue = Array.from({length: POINT_COUNT}, getRandomPoint);

console.log(testValue);

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
