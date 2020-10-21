import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '@booking/shared';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LayoutComponent, TopbarComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
