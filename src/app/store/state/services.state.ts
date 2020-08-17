import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch, append } from '@ngxs/store/operators';

import { IService } from '@booking/models/service.interface';
import { AddService } from '@actions/service.actions';

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

  @Action(AddService)
  addService(
    ctx: StateContext<ServicesStateModel>,
    { service }: AddService
  ): void {
    ctx.setState(
      patch({
        services: append([service]),
      })
    );
  }
}
