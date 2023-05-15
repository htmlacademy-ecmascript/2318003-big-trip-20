import AbstractView from '../framework/view/abstract-view.js';
import {FilterEmptyMessage} from '../constant.js';

const createEmptyTemplate = () => (
  `<p class="trip-events__msg">${FilterEmptyMessage.EVERYTHING}</p>`
);

export default class EmptyView extends AbstractView{

  get template() {
    return createEmptyTemplate();
  }
}
