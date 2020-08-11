import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewServiceRoutingModule } from './new-service-routing.module';
import { NewServiceComponent } from './new-service/new-service.component';

@NgModule({
  declarations: [NewServiceComponent],
  imports: [CommonModule, NewServiceRoutingModule],
})
export class NewServiceModule {}
