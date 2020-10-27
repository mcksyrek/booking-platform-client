import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { ToggleMenuAction } from './layout.actions';
import { patch } from '@ngxs/store/operators';

export class LayoutStateModel {
  menuAction: boolean;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: { menuAction: false },
})
@Injectable()
export class LayoutState {
  @Action(ToggleMenuAction)
  toggleMenu(ctx: StateContext<LayoutStateModel>): void {
    const prevState = ctx.getState().menuAction;
    ctx.setState(patch({ menuAction: !prevState }));
  }
}
