import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from '@booking/shared';
import { LoginComponent } from './login/login.component';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth.state';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgxsModule.forRoot([AuthState]),
  ],
})
export class AuthModule {}
