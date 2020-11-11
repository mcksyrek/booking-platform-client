import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfferFormComponent } from './offer-form/offer-form.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OfferDisplayComponent } from './offer-display/offer-display.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { AuthGuard } from '@booking/auth/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: OffersListComponent },
  { path: 'new', component: OfferFormComponent, canActivate: [AuthGuard] },
  {
    path: 'reservations/:type',
    component: ReservationsListComponent,
    canActivate: [AuthGuard],
  },
  { path: ':id', component: OfferDisplayComponent },
  { path: 'edit/:id', component: OfferFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
