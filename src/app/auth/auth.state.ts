import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetSessionDataAction } from './auth.actions';

export class AuthStateModel {
  token?: string;
  username?: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {},
})
@Injectable()
export class AuthState {
  @Selector()
  static getToken({ token }: AuthStateModel): string {
    return token;
  }

  @Selector()
  static getUsername({ username }: AuthStateModel): string {
    return username;
  }

  @Action(SetSessionDataAction)
  setToken(
    ctx: StateContext<AuthStateModel>,
    { token, username }: SetSessionDataAction
  ): AuthStateModel {
    return ctx.patchState({ token, username });
  }
}
