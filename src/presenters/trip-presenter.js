import ContentView from '../view/content-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

import TripEventsListView from '../view/trip-events-list-view.js';

export default class TripPresenter {
  listView = new TripEventsListView();

  constructor({tripContainer, destinationsModel, offersModel, pointsModel}) {
    this.tripContainer = tripContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;

    this.points = [...pointsModel.get()];
  }

  init() {
    render(new SortView(), this.tripContainer);
    render(this.listView, this.tripContainer);
    render(
      new EditPointView({
        point: this.points[0],
        pointDestinations: this.destinationsModel.getById(this.points[0].destination),
        pointOffers: this.offersModel.getByType(this.points[0].type)
      }),
      this.listView.getElement());
    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i];
      render(
        new ContentView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffer: this.offersModel.getByType(point.type)
        }),
        this.listView.getElement());
    }
  }
}
