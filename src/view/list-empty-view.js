import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../constant.js';

const FilterEmptyMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now'
};

const createEmptyTemplate = (filterType) => (
  `<p class="trip-events__msg">${FilterEmptyMessage[filterType]}</p>`
);

export default class EmptyView extends AbstractView{
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyTemplate(this.#filterType);
  }
}
