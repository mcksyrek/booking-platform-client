import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AddServiceAction } from '@actions/service.actions';
import { ServicesState } from '@state/services.state';
import { IService } from '@booking/service/shared/service.interface';

@Component({
  selector: 'booking-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceFormComponent {
  @Output() submitForm = new EventEmitter();

  @Select(ServicesState.getServices)
  readonly services$: Observable<IService[]>;

  readonly serviceForm: FormGroup;

  //   I guess it would be much better to make this component dumb,
  //  coz we can use it for edit purposes in the future or something like that.
  // Just emit the value with Output and create a new service at the parent component.

  constructor(formBuilder: FormBuilder, private _store: Store) {
    this.serviceForm = formBuilder.group({
      serviceName: [''],
    });
  }

  onSubmit(): void {
    this._addService(this.serviceForm.value.serviceName);
  }

  private _addService(name: string): void {
    this._store.dispatch(new AddServiceAction({ name }));
  }
}
