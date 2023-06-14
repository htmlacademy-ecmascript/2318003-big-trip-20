import AbstractView from '../framework/view/abstract-view.js';
import {DEFAULT_ERROR_MESSAGE} from '../constant.js';

const createErrorTemplate = (errorMessage) => (
  `<p class="trip-events__msg">${errorMessage}</p>`
);

export default class EmptyView extends AbstractView {
  #error;

  constructor ({message = DEFAULT_ERROR_MESSAGE}) {
    super();
    this.#error = message;
  }

  get template() {
    return createErrorTemplate(this.#error);
  }
}
