import AbstractView from '../framework/view/abstract-view.js';

const errorMessage = 'Something went wrong... Please, try again';

const createErrorTemplate = () => (
  `<p class="trip-events__msg">${errorMessage}</p>`
);

export default class EmptyView extends AbstractView{

  get template() {
    return createErrorTemplate();
  }
}
