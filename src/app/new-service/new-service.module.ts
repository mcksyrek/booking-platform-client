import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewServiceRoutingModule } from './new-service-routing.module';
import { NewServiceComponent } from './new-service/new-service.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { ServicesState } from '@app/store/state/services.state';

@NgModule({
  declarations: [NewServiceComponent],
  imports: [
    CommonModule,
    NewServiceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forRoot([ServicesState]),
  ],
})
export class NewServiceModule {}
