import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { OffersState } from '../state/offers.state';
import { IOffer } from '../offer.interface';
import { GetOfferListAction } from '../state/offers.actions';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';

@Component({
  selector: 'booking-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersListComponent extends AbstractSubscriber implements OnInit {
  // TODO figure out why cannot use this observbl direct in template
  @Select(OffersState.getCustomizedOffers)
  readonly offers$: Observable<IOffer[]>;
  offersList: IOffer[];

  constructor(private _store: Store) {
    super();
  }

  ngOnInit(): void {
    this._store.dispatch(new GetOfferListAction());
    this._subscriber.add(
      this.offers$.subscribe(offersList => (this.offersList = offersList))
    );
  }
}
