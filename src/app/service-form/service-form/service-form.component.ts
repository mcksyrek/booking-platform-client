import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AddServiceAction } from '@actions/service.actions';
import { ServicesState } from '@state/services.state';
import { IService } from '@booking/models/service.interface';

@Component({
  selector: 'booking-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceFormComponent {
  @Select(ServicesState.getServices)
  readonly services$: Observable<IService[]>;

  readonly serviceForm = this._formBuilder.group({
    serviceName: [''],
  });

  constructor(private _formBuilder: FormBuilder, private _store: Store) {}

  onSubmit(): void {
    this._addService(this.serviceForm.value.serviceName);
  }

  private _addService(name: string): void {
    this._store.dispatch(new AddServiceAction({ name }));
  }
}
