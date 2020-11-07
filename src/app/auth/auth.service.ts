import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IServerLoginResponse, IUser } from './auth.interface';
import { Endpoints } from '@booking/shared/enums';
import { environment } from '@booking/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  registerUser(newUser: IUser): Observable<IUser> {
    return this._httpClient.post<IUser>(
      `${environment.apiPrefix}${Endpoints.Auth}${Endpoints.SignUp}`,
      { ...newUser }
    );
  }

  login(user: IUser): Observable<IServerLoginResponse> {
    return this._httpClient.post<IServerLoginResponse>(
      `${environment.apiPrefix}${Endpoints.Auth}${Endpoints.SignIn}`,
      { ...user }
    );
  }

  setTokenInLocalStorage(token: string): void {
    window.localStorage.setItem('token', token);
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem('token');
  }
}
