import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Routes } from '@booking/shared/enums';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Messages } from '@booking/shared/enums';

@Component({
  selector: 'booking-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  get disableSubmit(): boolean {
    return !this.registrationForm.valid;
  }

  constructor(
    formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.registrationForm = formBuilder.group({
      username: ['', [Validators.required]],
      passwords: formBuilder.group(
        {
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        },
        { validator: this.checkPasswords }
      ),
    });
  }

  submitForm(): void {
    const { username } = this.registrationForm.value;
    const password = this.registrationForm.value.passwords.password;
    this._authService.registerUser({ username, password }).subscribe({
      complete: () => {
        this._snackBar.open(Messages.Success, null, { duration: 2000 });
        this.redirectToLogin();
      },
      error: () =>
        this._snackBar.open(Messages.Error, null, { duration: 2000 }),
    });
  }

  redirectToLogin(): void {
    this._router.navigateByUrl(Routes.Auth + Routes.Login);
  }

  checkPasswords(group: FormGroup): { passwordsMissmatch: boolean } {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { passwordsMissmatch: true };
  }
}
