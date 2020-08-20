import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { OfferFormComponent } from './offer-form/offer-form.component';
import { OffersState } from './state/offers.state';
import { OffersListComponent } from './offers-list/offers-list.component';

@NgModule({
  declarations: [OfferFormComponent, OffersListComponent],
  imports: [
    CommonModule,
    OffersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([OffersState]),
  ],
})
export class OffersModule {}
