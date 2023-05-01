import {render, RenderPosition} from './render.js';
import FiltersView from './view/filter-view.js';
import TripPresenter from './presenters/trip-presenter.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({tripContainer: tripEvents});


render(new FiltersView(), tripControlsFilters, RenderPosition.BEFOREEND);
tripPresenter.init();
