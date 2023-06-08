import {render} from './framework/render.js';
import {RenderPosition} from './render.js';

import HeaderView from './view/header-view.js';

import TripPresenter from './presenters/trip-presenter.js';
import FilterPresenter from './presenters/filter-presenter.js';

import MockService from './mock/service-mock.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const mainElement = document.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripMain = document.querySelector('.trip-main');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);
const filterModel = new FilterModel();

const points = pointsModel.points;
const allDestinations = destinationsModel.destinations;

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

if (points.length) {
  render(new HeaderView({points, allDestinations}), tripMain, RenderPosition.AFTERBEGIN);
}

filterPresenter.init();
tripPresenter.init();
