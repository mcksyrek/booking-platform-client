import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ServiceModel } from '@models/service.model';
import { AddService } from '@actions/service.actions';

export class ServicesStateModel {
  services: ServiceModel[];
}

@State<ServicesStateModel>({
  name: 'services',
  defaults: {
    services: [],
  },
})
@Injectable()
export class ServicesState {
  @Selector()
  static getServices(state: ServicesStateModel): ServiceModel[] {
    return state.services;
  }

  @Action(AddService)
  add(
    { getState, patchState }: StateContext<ServicesStateModel>,
    { payload }: AddService
  ): void {
    const state = getState();
    patchState({
      services: [...state.services, payload],
    });
  }
}
