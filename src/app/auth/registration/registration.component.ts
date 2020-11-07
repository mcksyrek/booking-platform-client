import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(formBuilder: FormBuilder, private _authService: AuthService) {
    this.registrationForm = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    console.log(this.registrationForm.value);
    this._authService.registerUser(this.registrationForm.value).subscribe();
  }
}
