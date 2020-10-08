import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch, append } from '@ngxs/store/operators';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IOffer } from '../offer.interface';
import { AddOfferAction, GetOfferListAction } from './offers.actions';
import { OffersService } from '../offers.service';

export class OffersStateModel {
  offers?: IOffer[];
}

@State<OffersStateModel>({
  name: 'offers',
  defaults: {},
})
@Injectable()
export class OffersState {
  constructor(private _offerService: OffersService) {}

  @Selector()
  static getOffers({ offers }: OffersStateModel): IOffer[] {
    return offers;
  }

  @Action(GetOfferListAction)
  getOffersList(ctx: StateContext<OffersStateModel>): Observable<IOffer[]> {
    return this._offerService.getOffersList().pipe(
      tap(offersList => {
        console.log('req sent');
        console.log(offersList);

        ctx.setState({ offers: [...offersList] });
      })
    );
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
