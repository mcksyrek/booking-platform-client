import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { OffersState } from '../state/offers.state';
import { IOffer } from '../offer.interface';
import { AddOfferAction, GetOfferListAction } from '../state/offers.actions';

@Component({
  selector: 'booking-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersListComponent implements OnInit {
  @Select(OffersState.getOffers)
  readonly offers$: Observable<IOffer[]>;

  showOfferForm = false;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(new GetOfferListAction());
  }

  handleFormSubmit(formValue: IOffer): void {
    this._store.dispatch(new AddOfferAction(formValue));

    this.toggleOfferForm();
  }

  toggleOfferForm(): void {
    this.showOfferForm = !this.showOfferForm;
  }
}
