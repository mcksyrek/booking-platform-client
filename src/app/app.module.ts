import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { SharedModule } from './shared/';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptor } from './auth/token-interceptor/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInitializer } from './auth/auth.initializer';

import { NgxsModule, Store } from '@ngxs/store';
import { AuthService } from './auth/auth.service';
import { AuthState } from './auth/auth.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LayoutModule,
    AuthModule,
    NgxsModule.forRoot([AuthState]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: authInitializer,
      deps: [AuthService, Store],
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
