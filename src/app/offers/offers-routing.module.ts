import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferFormComponent } from './offer-form/offer-form.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OfferDisplayComponent } from './offer-display/offer-display.component';
const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: OffersListComponent },
  { path: 'new', component: OfferFormComponent },
  { path: ':id', component: OfferDisplayComponent },
  { path: 'edit/:id', component: OfferFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
