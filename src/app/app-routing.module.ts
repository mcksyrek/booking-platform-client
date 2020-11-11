import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '@booking/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'offers', pathMatch: 'full' },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('@booking/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'offers',
        loadChildren: () =>
          import('@booking/offers/offers.module').then(m => m.OffersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
