import {IOffer} from '../models/offer';

export class Offer {

  private _offer: IOffer = {} as IOffer;

  constructor(state) {
    this._offer.salary = state.salary;
    this._offer.location = state.location;
    this._offer.contract = state.contract;
    this._offer.title = state.title;
    this._offer.technos = state.technos;
    this._offer.content = state.content;
    this._offer.group = state.group;
  }

  public get offer() {
    return this._offer
  }

}
