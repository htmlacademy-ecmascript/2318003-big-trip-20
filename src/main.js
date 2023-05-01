import {render, RenderPosition} from './render.js';
import FiltersView from './view/filter-view.js';
import PointPresenter from './presenters/presenter.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const pointPresenter = new PointPresenter({pointContainer: tripEvents});


render(new FiltersView(), tripControlsFilters, RenderPosition.BEFOREEND);
pointPresenter.init();
