import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetSessionDataAction, RemoveSessionDataAction } from './auth.actions';

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

  @Selector()
  static isLogged({ token }: AuthStateModel): boolean {
    console.log(token);
    return !!token;
  }

  @Action(SetSessionDataAction)
  setSessionData(
    ctx: StateContext<AuthStateModel>,
    { token, username }: SetSessionDataAction
  ): AuthStateModel {
    return ctx.patchState({ token, username });
  }

  @Action(RemoveSessionDataAction)
  removeSessionData(
    ctx: StateContext<AuthStateModel>,
    { token, username }: SetSessionDataAction
  ): AuthStateModel {
    return ctx.setState({});
  }
}
