import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceFormRoutingModule } from './service-form-routing.module';
import { ServiceFormComponent } from './service-form/service-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { ServicesState } from '@state/services.state';

@NgModule({
  declarations: [ServiceFormComponent],
  imports: [
    CommonModule,
    ServiceFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([ServicesState]),
  ],
})
export class ServiceFormModule {}
