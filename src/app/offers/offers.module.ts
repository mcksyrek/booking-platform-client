import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@booking/shared';
import { OffersRoutingModule } from './offers-routing.module';
import { NgxsModule } from '@ngxs/store';

import { OfferFormComponent } from './offer-form/offer-form.component';
import { OffersState } from './state/offers.state';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OfferCardComponent } from './offer-card/offer-card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { OfferDisplayComponent } from './offer-display/offer-display.component';
import { SelectProductComponent } from './select-product/select-product.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';

@NgModule({
  declarations: [
    OfferFormComponent,
    OffersListComponent,
    OfferCardComponent,
    ToolbarComponent,
    ProductsListComponent,
    OfferDisplayComponent,
    SelectProductComponent,
    ReservationsListComponent,
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    SharedModule,
    NgxsModule.forFeature([OffersState]),
  ],
})
export class OffersModule {}
