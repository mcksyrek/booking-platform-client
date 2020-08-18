import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { ServiceFormComponent } from './service-form/service-form.component';
import { ServicesState } from '@state/services.state';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServicesService } from './shared/services.service';

@NgModule({
  declarations: [ServiceFormComponent, ServicesListComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([ServicesState]),
  ],
  providers: [ServicesService],
})
export class ServicesModule {}
