import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../constant.js';

const createSortTemplate = (type, sortType) => {
  const isDisabled = (type === SortType.EVENT || type === SortType.OFFERS) ? 'disabled' : '';
  const isChecked = (type === sortType && !(type === SortType.EVENT || type === SortType.OFFERS)) ? 'checked' : '';
  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isDisabled} ${isChecked}>
      <label class="trip-sort__btn" for="sort-${type}"  data-sort-type=${type}>${type}</label>
    </div>`
  );
};


const createSortsTemplate = (sortType) => {
  const createSortMarkup = Object.values(SortType).map((type) => createSortTemplate(type, sortType)).join('');
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createSortMarkup}
    </form>`
  );
};

export default class SortView extends AbstractView{
  #handleSortTypeChange = null;
  #sortType = null;

  constructor({onSortTypeChange, sortType}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#sortType = sortType;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortsTemplate(this.#sortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);

  };
}
