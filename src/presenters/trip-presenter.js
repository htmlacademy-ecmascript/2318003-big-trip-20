import ContentView from '../view/content-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

import TripEventsListView from '../view/trip-events-list-view.js';

export default class TripPresenter {
  listView = new TripEventsListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new SortView(), this.tripContainer);
    render(this.listView, this.tripContainer);
    render(new EditPointView(), this.listView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ContentView(), this.listView.getElement());
    }
  }
}
