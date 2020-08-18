import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { AddServiceAction } from '@actions/service.actions';
import { IService } from './service.interface';

@Injectable()
export class ServicesService {
  constructor(private _store: Store) {}

  addService(newService: IService): void {
    this._store.dispatch(new AddServiceAction(newService));
  }
}
