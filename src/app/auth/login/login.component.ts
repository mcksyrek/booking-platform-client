import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IServerLoginResponse } from '../auth.interface';
import { AuthService } from '../auth.service';
import { Store } from '@ngxs/store';
import { SetTokenAction } from '../auth.actions';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthStateModel } from '../auth.state';
import { Router } from '@angular/router';
import { Routes } from '@booking/shared/enums';

@Component({
  selector: 'booking-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;

  get disableSubmit(): boolean {
    return !this.loginForm.valid;
  }

  constructor(
    formBuilder: FormBuilder,
    private _authService: AuthService,
    private _store: Store,
    private _router: Router
  ) {
    this.loginForm = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    console.log(this.loginForm.value);
    this._authService
      .login(this.loginForm.value)
      .pipe(
        switchMap((serverRes: IServerLoginResponse) =>
          this._handleServerResponse(serverRes)
        )
      )
      .subscribe(serverRes => {
        console.log(serverRes);
        this._router.navigateByUrl(Routes.Offers + Routes.All);
      });
  }

  private _handleServerResponse({
    type,
    token,
    // TODO store username and role
    username,
    roles,
  }: IServerLoginResponse): Observable<AuthStateModel> {
    const joinedToken = this._joinToken(type, token);
    this._authService.setTokenInLocalStorage(joinedToken);
    return this._store.dispatch(new SetTokenAction(joinedToken));
  }

  private _joinToken(type: string, token: string): string {
    return `${type} ${token}`;
  }
}
