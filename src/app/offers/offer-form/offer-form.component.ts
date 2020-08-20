import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'booking-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferFormComponent {
  @Output() readonly submitForm = new EventEmitter();

  readonly offerForm: FormGroup;

  get disabledSubmit(): boolean {
    return !this.offerForm.dirty || !this.offerForm.valid;
  }

  constructor(formBuilder: FormBuilder) {
    this.offerForm = formBuilder.group({
      offerName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitForm.emit(this.offerForm.value);
  }
}
