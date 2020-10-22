import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { OfferFormComponent } from './offer-form/offer-form.component';

import { OffersListComponent } from './offers-list/offers-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: OffersListComponent },
  { path: 'new', component: EditOfferComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
