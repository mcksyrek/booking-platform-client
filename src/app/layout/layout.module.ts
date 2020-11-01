import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '@booking/shared';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { NgxsModule } from '@ngxs/store';

import { LayoutState } from './layout.state';

@NgModule({
  declarations: [LayoutComponent, TopbarComponent, MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    NgxsModule.forRoot([LayoutState]),
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
