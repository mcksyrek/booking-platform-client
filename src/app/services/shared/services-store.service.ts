import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { AddServiceAction } from '../state/service.actions';
import { IService } from './service.interface';

@Injectable()
export class ServicesStoreService {
  constructor(private _store: Store) {}

  addService(newService: IService): void {
    this._store.dispatch(new AddServiceAction(newService));
  }
}
