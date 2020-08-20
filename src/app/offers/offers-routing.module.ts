import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffersListComponent } from './offers-list/offers-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: OffersListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffersRoutingModule {}
