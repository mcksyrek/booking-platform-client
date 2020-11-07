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
      // TODO length validators
      username: ['', [Validators.required]],
      passwords: formBuilder.group(
        {
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        },
        { validator: this.checkPasswords }
      ),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
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

  checkPasswords(group: FormGroup): { passwordsMissmatch: boolean } {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { passwordsMissmatch: true };
  }
}
