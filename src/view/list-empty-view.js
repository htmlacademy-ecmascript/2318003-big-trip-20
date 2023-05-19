import AbstractView from '../framework/view/abstract-view.js';
import {FilterType, FilterEmptyMessage} from '../constant.js';

const createEmptyTemplate = () => (
  `<p class="trip-events__msg">${FilterEmptyMessage[FilterType.EVERYTHING]}</p>`
);

export default class EmptyView extends AbstractView{

  get template() {
    return createEmptyTemplate();
  }
}
