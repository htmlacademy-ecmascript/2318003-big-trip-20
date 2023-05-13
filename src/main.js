import {render} from './framework/render.js';
import {RenderPosition} from './render.js';
import FiltersView from './view/filter-view.js';
import TripPresenter from './presenters/trip-presenter.js';
import {generateFilter} from './mock/filter-mock.js';

import MockService from './mock/service-mock.js';
import DestinationsModel from './model/destination-model.js';
import OffersModel from './model/offer-model.js';
import PointsModel from './model/points-model.js';

const mainElement = document.querySelector('.page-main');
const eventListElement = mainElement.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);
const filters = generateFilter(pointsModel.points);

const tripPresenter = new TripPresenter({
  tripContainer: eventListElement,
  destinationsModel,
  offersModel,
  pointsModel
});

render(new FiltersView({filters}), tripControlsFilters, RenderPosition.BEFOREEND);
tripPresenter.init();
