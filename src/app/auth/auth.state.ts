import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetTokenAction } from './auth.actions';

export class AuthStateModel {
  token?: string;
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

  @Action(SetTokenAction)
  setToken(ctx: StateContext<AuthStateModel>, { token }: SetTokenAction): void {
    ctx.setState({ token });
  }
}
