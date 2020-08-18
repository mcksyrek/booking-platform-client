import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';

import { IService } from '../shared/service.interface';
import { AddServiceAction } from '@actions/service.actions';

@Component({
  selector: 'booking-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddServiceComponent {
  constructor(private _store: Store) {}

  handleFormSubmit(formValue: IService): void {
    this._addService(formValue);
  }

  private _addService(newService: IService): void {
    this._store.dispatch(new AddServiceAction(newService));
  }
}
