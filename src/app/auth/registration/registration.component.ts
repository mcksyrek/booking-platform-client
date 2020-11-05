import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'booking-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  get disableSubmit(): boolean {
    return !this.registrationForm.valid;
  }

  constructor(formBuilder: FormBuilder) {
    this.registrationForm = formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    // TODO submiting form action
    alert('submit form');
  }
}
