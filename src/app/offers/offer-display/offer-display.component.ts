import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICON_PATH } from '@booking/shared/constants';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IOffer, IProduct } from '../offer.interface';
import { MatDialog } from '@angular/material/dialog';

import { GetOfferByIdAction } from '../state/offers.actions';
import { OffersState } from '../state/offers.state';
import { SelectProductComponent } from '../select-product/select-product.component';

@Component({
  selector: 'booking-offer-display',
  templateUrl: './offer-display.component.html',
  styleUrls: ['./offer-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferDisplayComponent {
  @Select(OffersState.getSelectedOffer)
  readonly selectedOfferData$: Observable<IOffer>;
  readonly selectedOfferId: number;

  constructor(
    private _store: Store,
    activatedRoute: ActivatedRoute,
    private _dialog: MatDialog
  ) {
    this.selectedOfferId = activatedRoute.snapshot.params.id;
    this._store.dispatch(new GetOfferByIdAction(this.selectedOfferId));
  }

  getSource(category: string): string {
    return `/${ICON_PATH}/${category}.svg`;
  }

  handleSelectedProduct(product: IProduct): void {
    const dialogRef = this._dialog.open(SelectProductComponent, {
      data: {
        product,
        offerId: this.selectedOfferId,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
