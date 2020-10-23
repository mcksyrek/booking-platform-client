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
import { OFFER_CATEGORIES } from '@booking/shared/constants/categories.constant';

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
  readonly categories = OFFER_CATEGORIES;

  get disabledSubmit(): boolean {
    return !this.offerForm.valid;
  }

  constructor(formBuilder: FormBuilder) {
    this.offerForm = formBuilder.group({
      name: ['', Validators.required],
      id: [''],
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
