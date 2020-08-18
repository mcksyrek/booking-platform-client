import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';

@Component({
  selector: 'booking-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceFormComponent {
  @Output() submitForm = new EventEmitter();

  readonly serviceForm: FormGroup;

  get disabledSubmit(): boolean {
    return !this.serviceForm.dirty && this.serviceForm.valid;
  }

  constructor(formBuilder: FormBuilder) {
    this.serviceForm = formBuilder.group({
      serviceName: [''],
    });
  }

  onSubmit(): void {
    this.submitForm.emit(this.serviceForm.value);
  }
}
