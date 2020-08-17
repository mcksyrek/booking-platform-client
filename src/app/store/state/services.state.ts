import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch, append } from '@ngxs/store/operators';

import { IService } from '@app/models/service.interface';
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
  static getServices(state: ServicesStateModel): IService[] {
    return state.services;
  }

  @Action(AddService)
  addService(
    ctx: StateContext<ServicesStateModel>,
    { payload }: AddService
  ): void {
    ctx.setState(
      patch({
        services: append([payload]),
      })
    );
  }
}
