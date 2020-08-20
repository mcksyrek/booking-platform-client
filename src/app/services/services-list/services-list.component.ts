import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { ServicesState } from '../state/services.state';
import { IService } from '../shared/service.interface';
import { AddServiceAction } from '../state/service.actions';

@Component({
  selector: 'booking-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent {
  @Select(ServicesState.getServices)
  readonly services$: Observable<IService[]>;

  showServiceForm = false;

  constructor(private _store: Store) {}

  handleFormSubmit(formValue: IService): void {
    this._store.dispatch(new AddServiceAction(formValue));

    this.toggleServiceForm();
  }

  toggleServiceForm(): void {
    this.showServiceForm = !this.showServiceForm;
  }
}
