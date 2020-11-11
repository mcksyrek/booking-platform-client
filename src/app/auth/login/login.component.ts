import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IServerLoginResponse } from '../auth.interface';
import { AuthService } from '../auth.service';
import { Store } from '@ngxs/store';
import { SetSessionDataAction } from '../auth.actions';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthStateModel } from '../auth.state';
import { Router } from '@angular/router';
import { Routes } from '@booking/shared/enums';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Messages } from '@booking/shared/enums';

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
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    this._authService
      .login(this.loginForm.value)
      .pipe(
        switchMap((serverRes: IServerLoginResponse) =>
          this._handleServerResponse(serverRes)
        )
      )
      .subscribe({
        complete: () => {
          this._snackBar.open(Messages.LoginSuccess, null, { duration: 2000 });
          this._router.navigateByUrl(Routes.Offers + Routes.All);
        },
        error: () =>
          this._snackBar.open(Messages.LoginError, null, { duration: 2000 }),
      });
  }

  redirectToRegistration(): void {
    this._router.navigateByUrl(Routes.Auth + Routes.Registration);
  }

  private _handleServerResponse({
    type,
    token,
    username,
  }: IServerLoginResponse): Observable<AuthStateModel> {
    const joinedToken = this._joinToken(type, token);
    this._authService.setTokenInLocalStorage(joinedToken);
    this._authService.setUsernameInLocalStorage(username);
    return this._store.dispatch(
      new SetSessionDataAction(joinedToken, username)
    );
  }

  private _joinToken(type: string, token: string): string {
    return `${type} ${token}`;
  }
}
