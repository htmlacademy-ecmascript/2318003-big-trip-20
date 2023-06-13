import AbstractView from '../framework/view/abstract-view.js';
import {capitalize} from '../utils/utils.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, count} = filter;
  const isDisabled = (count === 0) ? 'disabled' : '';
  const isChecked = (type === currentFilterType) ? 'checked' : '';

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter" ${isDisabled}
        value="${type}"
        ${isChecked}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">${capitalize(filter.type)}</label>
    </div>`
  );
};

const createFiltersTemplate = (filterItems, currentFilterType) => {
  const filtersMarkup = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">

      ${filtersMarkup}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FiltersView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}

