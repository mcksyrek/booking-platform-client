import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICON_PATH } from '@booking/shared/constants';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IOffer, IProduct, IReservation } from '../offer.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GetOfferByIdAction } from '../state/offers.actions';
import { OffersState } from '../state/offers.state';
import { SelectProductComponent } from '../select-product/select-product.component';
import { OffersService } from '../offers.service';
import { switchMap } from 'rxjs/operators';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';

@Component({
  selector: 'booking-offer-display',
  templateUrl: './offer-display.component.html',
  styleUrls: ['./offer-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferDisplayComponent extends AbstractSubscriber {
  @Select(OffersState.getSelectedOffer)
  readonly selectedOfferData$: Observable<IOffer>;
  readonly selectedOfferId: number;

  constructor(
    private _store: Store,
    activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _offersService: OffersService,
    private _snackBar: MatSnackBar
  ) {
    super();
    this.selectedOfferId = activatedRoute.snapshot.params.id;
    this._store.dispatch(new GetOfferByIdAction(this.selectedOfferId));
  }

  getSource(category: string): string {
    return `/${ICON_PATH}/${category}.svg`;
  }

  handleSelectedProduct(selectedProduct: IProduct): void {
    const dialogRef = this._dialog.open(SelectProductComponent, {
      data: {
        product: selectedProduct,
        offerId: this.selectedOfferId,
      },
    });
    this._subscriber.add(
      dialogRef
        .afterClosed()
        .pipe(
          switchMap(
            ({
              duration,
              date,
              hour,
              product,
              clientName,
              clientPhone,
            }: IReservation) => {
              return this._offersService.postNewReservation(
                date,
                duration.toString(),
                this.selectedOfferId.toString(),
                { hour, product, clientName, clientPhone }
              );
            }
          )
        )
        .subscribe({
          next: () => this._snackBar.open('Reservation made successfully'),
          error: () => this._snackBar.open('Error, reservation is not created'),
        })
    );
  }
}
