import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@booking/shared';
import { OffersRoutingModule } from './offers-routing.module';
import { NgxsModule } from '@ngxs/store';

import { OfferFormComponent } from './offer-form/offer-form.component';
import { OffersState } from './state/offers.state';
import { OffersListComponent } from './offers-list/offers-list.component';

@NgModule({
  declarations: [OfferFormComponent, OffersListComponent],
  imports: [
    CommonModule,
    OffersRoutingModule,
    SharedModule,
    NgxsModule.forRoot([OffersState]),
  ],
})
export class OffersModule {}
