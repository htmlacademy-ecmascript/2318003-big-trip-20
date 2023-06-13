import TripPresenter from './presenters/trip-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';
import HeaderPresenter from './presenters/header-presenter.js';

import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

import PointsApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic ry75Uop2fg12jb103';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const mainElement = document.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');

const destinationsModel = new DestinationsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: eventListElement,
  tripMain: tripMain,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFilters,
  filterModel,
  pointsModel
});

const headerPresenter = new HeaderPresenter({
  tripMainContainer: tripMain,
  destinationsModel,
  pointsModel,
  offersModel,
});

filterPresenter.init();
tripPresenter.init();
headerPresenter.init();

Promise.all([destinationsModel.init(), offersModel.init()])
  .then(() => pointsModel.init());
