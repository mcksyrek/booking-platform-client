import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch, append } from '@ngxs/store/operators';

import { IService } from '@booking/services/shared/service.interface';
import { AddServiceAction } from './service.actions';

export class ServicesStateModel {
  services?: IService[];
}

@State<ServicesStateModel>({
  name: 'services',
  defaults: {},
})
@Injectable()
export class ServicesState {
  @Selector()
  static getServices({ services }: ServicesStateModel): IService[] {
    return services;
  }

  @Action(AddServiceAction)
  addService(
    ctx: StateContext<ServicesStateModel>,
    { service }: AddServiceAction
  ): void {
    ctx.setState(
      patch({
        services: append([service]),
      })
    );
  }
}
