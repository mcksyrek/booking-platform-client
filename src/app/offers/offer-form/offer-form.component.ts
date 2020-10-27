import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscriber } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IOffer, IProduct } from '../offer.interface';
import { OFFER_CATEGORIES } from '@booking/shared/constants/categories.constant';
import {
  DeleteOfferAction,
  GetOfferByIdAction,
  UpdateOfferAction,
  AddOfferAction,
  UnselectOfferAction,
} from '../state/offers.actions';
import { OffersState } from '../state/offers.state';
import { Routes } from '@booking/shared/enums/index';

@Component({
  selector: 'booking-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferFormComponent implements OnInit, OnDestroy {
  @Output() readonly submitForm = new EventEmitter<IOffer>();
  @Select(OffersState.getSelectedOffer)
  readonly selectedOffer$: Observable<IOffer>;

  readonly offerForm: FormGroup;
  readonly categories = OFFER_CATEGORIES;
  private _selectedOfferId: number;
  private _subscriber = new Subscriber();

  productsList$: Observable<IProduct[]>;

  get disabledSubmit(): boolean {
    return !this.offerForm.valid;
  }

  constructor(
    private _formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    private _store: Store,
    private _router: Router
  ) {
    if (activatedRoute.snapshot.params.id) {
      this._selectedOfferId = activatedRoute.snapshot.params.id;
      this._store.dispatch(new GetOfferByIdAction(this._selectedOfferId));
    }

    this.offerForm = _formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      author: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      products: _formBuilder.array([]),
    });

    this.productsList$ = this.offerForm.controls.products.valueChanges;
  }

  ngOnInit(): void {
    this._subscriber.add(
      this.selectedOffer$
        .pipe(filter(selectedOfferData => !!selectedOfferData))
        .subscribe(offerData => this._setOfferForm(offerData))
    );
  }

  ngOnDestroy(): void {
    this._store.dispatch(new UnselectOfferAction());
    this._subscriber.unsubscribe();
  }

  onSubmit(): void {
    if (this._selectedOfferId) {
      this._store.dispatch(new UpdateOfferAction(this.offerForm.value));
    } else {
      this._store.dispatch(new AddOfferAction(this.offerForm.value));
    }
    this._router.navigateByUrl(Routes.Offers + Routes.All);
  }

  onDelete(): void {
    if (this._selectedOfferId) {
      this._store.dispatch(new DeleteOfferAction(this._selectedOfferId));
    }
    this._router.navigateByUrl(Routes.Offers + Routes.All);
  }

  private _setOfferForm(offerData: IOffer): void {
    const products = [...offerData.products];
    const productsArray = this.offerForm.controls.products as FormArray;
    delete offerData.products;

    this.offerForm.patchValue(offerData);
    products.forEach(product =>
      productsArray.push(this._formBuilder.control(product))
    );
  }
}
