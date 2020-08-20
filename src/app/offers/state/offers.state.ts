import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch, append } from '@ngxs/store/operators';

import { IOffer } from '../offer.interface';
import { AddOfferAction } from './offers.actions';

export class OffersStateModel {
  offers?: IOffer[];
}

@State<OffersStateModel>({
  name: 'offers',
  defaults: {},
})
@Injectable()
export class OffersState {
  @Selector()
  static getOffers({ offers }: OffersStateModel): IOffer[] {
    return offers;
  }

  @Action(AddOfferAction)
  addOffer(
    ctx: StateContext<OffersStateModel>,
    { offer }: AddOfferAction
  ): void {
    ctx.setState(
      patch({
        offers: append([offer]),
      })
    );
  }
}
