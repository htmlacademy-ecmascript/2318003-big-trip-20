import AbstractView from '../framework/view/abstract-view.js';
import {capitalize} from '../utils.js';

const createFilterItemTemplate = (filter) => {
  const {type, count} = filter;
  const isDisabled = (count === 0) ? 'disabled' : '';

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${isDisabled} value="${type}" checked>
      <label class="trip-filters__filter-label" for="filter-${type}">${capitalize(type)}</label>
    </div>`
  );
};

const createFiltersTemplate = (filterItems) => {
  let filterItemsTemplate = '';
  for (let i = 0; i < filterItems.length; i++) {
    filterItemsTemplate += createFilterItemTemplate(filterItems[i]);
  }

  return (
    `<form class="trip-filters" action="#" method="get">

      ${filterItemsTemplate}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};


export default class FiltersView extends AbstractView{
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}

