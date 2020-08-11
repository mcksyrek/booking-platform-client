import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AddService } from '../../store/actions/service.actions';
import { ServicesState } from '../../store/state/services.state';
import { ServiceModel } from '../../models/service.model';

@Component({
  selector: 'booking-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewServiceComponent {
  @Select(ServicesState.getServices) services$: Observable<ServiceModel[]>;

  newServiceForm = this._formBuilder.group({
    serviceName: [''],
  });

  constructor(private _formBuilder: FormBuilder, private _store: Store) {}

  // TODO add typedef
  onSubmit(): void {
    this._addService(this.newServiceForm.value.serviceName);
  }

  private _addService(name: string): void {
    this._store.dispatch(new AddService({ name }));
  }
}
