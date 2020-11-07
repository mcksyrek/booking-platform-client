import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from '@booking/shared';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
