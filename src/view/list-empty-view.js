import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../constant.js';

const loadingMessage = 'Loading...';

const FilterEmptyMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

const showMessage = (isLoading, filterType) => isLoading ? loadingMessage : FilterEmptyMessage[filterType];

const createEmptyTemplate = (isLoading, filterType) => (
  `<p class="trip-events__msg">${showMessage(isLoading, filterType)}</p>`
);

export default class EmptyView extends AbstractView{
  #filterType = null;
  #isLoading = null;

  constructor({filterType, isLoading}) {
    super();
    this.#filterType = filterType;
    this.#isLoading = isLoading;
  }

  get template() {
    return createEmptyTemplate(this.#isLoading, this.#filterType);
  }
}
