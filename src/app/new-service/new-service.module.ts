import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewServiceRoutingModule } from './new-service-routing.module';
import { NewServiceComponent } from './new-service/new-service.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewServiceComponent],
  imports: [
    CommonModule,
    NewServiceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class NewServiceModule {}
