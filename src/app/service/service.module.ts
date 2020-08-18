import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { ServiceFormComponent } from './service-form/service-form.component';
import { ServicesState } from '@state/services.state';
import { AddServiceComponent } from './add-service/add-service.component';
import { ServicesListComponent } from './services-list/services-list.component';

@NgModule({
  declarations: [ServiceFormComponent, AddServiceComponent, ServicesListComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([ServicesState]),
  ],
})
export class ServiceModule {}
