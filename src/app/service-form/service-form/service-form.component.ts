import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AddService } from '../../store/actions/service.actions';
import { ServicesState } from '../../store/state/services.state';
import { ServiceModel } from '../../models/service.model';

@Component({
  selector: 'booking-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceFormComponent {
  @Select(ServicesState.getServices)
  readonly services$: Observable<ServiceModel[]>;

  readonly serviceForm = this._formBuilder.group({
    serviceName: [''],
  });

  constructor(private _formBuilder: FormBuilder, private _store: Store) {}

  onSubmit(): void {
    this._addService(this.serviceForm.value.serviceName);
  }

  private _addService(name: string): void {
    this._store.dispatch(new AddService({ name }));
  }
}
