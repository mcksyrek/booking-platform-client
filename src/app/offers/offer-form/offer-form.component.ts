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
import { Observable } from 'rxjs';
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
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';

@Component({
  selector: 'booking-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferFormComponent extends AbstractSubscriber
  implements OnInit, OnDestroy {
  @Select(OffersState.getSelectedOffer)
  readonly selectedOffer$: Observable<IOffer>;
  readonly offerForm: FormGroup;
  readonly categories = OFFER_CATEGORIES;
  readonly selectedOfferId: number;
  readonly productsFormArray: FormArray;

  get disabledSubmit(): boolean {
    return !this.offerForm.valid;
  }

  constructor(
    private _formBuilder: FormBuilder,
    activatedRoute: ActivatedRoute,
    private _store: Store,
    private _router: Router
  ) {
    super();

    if (activatedRoute.snapshot.params.id) {
      this.selectedOfferId = activatedRoute.snapshot.params.id;
      this._store.dispatch(new GetOfferByIdAction(this.selectedOfferId));
    }

    this.offerForm = _formBuilder.group({
      id: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      author: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      postalCode: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern(/\d{2}-\d{3}/),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{9}$/)],
      ],
      category: ['', Validators.required],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(255),
        ],
      ],
      products: _formBuilder.array([]),
    });

    this.productsFormArray = this.offerForm.controls.products as FormArray;
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
  }

  onSubmit(): void {
    if (this.selectedOfferId) {
      this._store.dispatch(new UpdateOfferAction(this.offerForm.value));
    } else {
      this._store.dispatch(new AddOfferAction(this.offerForm.value));
    }
    this.redirectToMainPage();
  }

  onDelete(): void {
    if (this.selectedOfferId) {
      this._store.dispatch(new DeleteOfferAction(this.selectedOfferId));
    }
    this.redirectToMainPage();
  }

  redirectToMainPage(): void {
    this._router.navigateByUrl(Routes.Offers + Routes.All);
  }

  addProduct(): void {
    const emptyProduct: IProduct = { name: '', duration: null, price: null };
    this.productsFormArray.push(this._buildProductGroup(emptyProduct));
  }

  removeProduct(index: number): void {
    this.productsFormArray.removeAt(index);
  }

  private _setOfferForm(offerData: IOffer): void {
    const products = offerData.products ? [...offerData.products] : [];
    delete offerData.products;

    this.offerForm.patchValue(offerData);
    products.forEach(product =>
      this.productsFormArray.push(this._buildProductGroup(product))
    );
  }

  private _buildProductGroup({ name, duration, price }: IProduct): FormGroup {
    return this._formBuilder.group({
      name: [name, Validators.required],
      duration: [duration, Validators.required],
      price: [price, Validators.required],
    });
  }
}
