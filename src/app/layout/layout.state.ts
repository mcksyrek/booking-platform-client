import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { ToggleMenuAction } from './layout.actions';
import { patch } from '@ngxs/store/operators';

export class LayoutStateModel {
  menuAction: null;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: { menuAction: null },
})
@Injectable()
export class LayoutState {
  @Selector()
  static getMenuAction({ menuAction }: LayoutStateModel): null {
    return menuAction;
  }

  @Action(ToggleMenuAction)
  toggleMenu(ctx: StateContext<LayoutStateModel>): void {
    ctx.setState(patch({ menuAction: null }));
  }
}
