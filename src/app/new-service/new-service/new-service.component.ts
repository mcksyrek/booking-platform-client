import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'booking-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewServiceComponent {
  newServiceForm = this._formBuilder.group({
    serviceName: [''],
  });

  constructor(private _formBuilder: FormBuilder) {}

  onSubmit() {
    console.log(this.newServiceForm.value);
  }
}
