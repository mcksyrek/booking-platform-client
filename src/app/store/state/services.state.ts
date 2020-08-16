import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch, append } from '@ngxs/store/operators';

import { IServiceModel } from '@models/service.model';
import { AddService } from '@actions/service.actions';

export class ServicesStateModel {
  services?: IServiceModel[];
}

@State<ServicesStateModel>({
  name: 'services',
  defaults: {},
})
@Injectable()
export class ServicesState {
  @Selector()
  static getServices(state: ServicesStateModel): IServiceModel[] {
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
