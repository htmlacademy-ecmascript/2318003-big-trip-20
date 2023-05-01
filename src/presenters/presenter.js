import ContentView from '../view/content-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import {render, RenderPosition} from '../render.js';

const tripEvents = document.querySelector('.trip-events');

export default class PointPresenter {
  constructor({pointContainer}) {
    this.pointContainer = pointContainer;
  }

  init() {
    render(new SortView(), tripEvents, RenderPosition.AFTERBEGGIN);
    render(new EditPointView(), tripEvents, RenderPosition.AFTERBEGGIN);

    for (let i = 0; i < 3; i++) {
      render(new ContentView(), tripEvents, RenderPosition.AFTEREND);
    }
  }
}
