import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthState } from '../auth.state';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // @Select(AuthState.getToken)
  // TODO consider taking it from state

  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: this._authService.getTokenFromLocalStorage(),
      },
    });
    console.log(this._authService.getTokenFromLocalStorage());
    return next.handle(request);
  }
}
