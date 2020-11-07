import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Routes } from '@booking/shared/enums';
import { AuthService } from '../auth.service';

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
    private _router: Router
  ) {
    this.registrationForm = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    this._authService
      .registerUser(this.registrationForm.value)
      .subscribe(() => this.redirectToLogin());
  }

  redirectToLogin(): void {
    this._router.navigateByUrl(Routes.Auth + Routes.Login);
  }
}
