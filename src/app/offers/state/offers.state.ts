import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch, append, removeItem } from '@ngxs/store/operators';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { IOffer } from '../offer.interface';
import {
  AddOfferAction,
  GetOfferListAction,
  DeleteOfferAction,
} from './offers.actions';
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
        ctx.setState({ offers: [...offersList] });
      })
    );
  }

  @Action(AddOfferAction)
  addOffer(
    ctx: StateContext<OffersStateModel>,
    { offer }: AddOfferAction
  ): Observable<any> {
    return this._offerService.postNewOffer(offer).pipe(
      tap(() =>
        ctx.setState(
          patch({
            offers: append([offer]),
          })
        )
      )
    );
  }

  @Action(DeleteOfferAction)
  deleteOffer(
    ctx: StateContext<OffersStateModel>,
    { id }: DeleteOfferAction
  ): Observable<ArrayBuffer> {
    return this._offerService.deleteOffer(id).pipe(
      tap(() =>
        ctx.setState(
          patch({
            offers: removeItem<IOffer>(offer => offer.id === id),
          })
        )
      )
    );
  }
}
