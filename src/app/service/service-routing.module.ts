import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddServiceComponent } from './add-service/add-service.component';

const routes: Routes = [
  { path: '', redirectTo: 'new', pathMatch: 'full' },
  { path: 'new', component: AddServiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
