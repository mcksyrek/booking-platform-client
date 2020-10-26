import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IOffer } from '../offer.interface';

@Component({
  selector: 'booking-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferFormComponent implements OnInit {
  @Output() readonly submitForm = new EventEmitter<IOffer>();
  @Input() offerData: IOffer;

  readonly offerForm: FormGroup;

  get disabledSubmit(): boolean {
    return !this.offerForm.valid;
  }

  constructor(formBuilder: FormBuilder) {
    this.offerForm = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      author: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.offerData) {
      this.offerForm.setValue(this.offerData);
    }
  }

  onSubmit(): void {
    this.submitForm.emit(this.offerForm.value);
  }
}
