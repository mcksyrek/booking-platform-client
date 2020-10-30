import {
  State,
  Action,
  StateContext,
  Selector,
  StateOperator,
} from '@ngxs/store';
import { Injectable } from '@angular/core';

import { ToggleMenuAction } from './layout.actions';

function toggleMenuOperator(): StateOperator<LayoutStateModel> {
  return (state: Readonly<LayoutStateModel>) => {
    return { ...state, toggleMenu: !state.toggleMenu };
  };
}

export class LayoutStateModel {
  toggleMenu: boolean;
}

@State<LayoutStateModel>({
  name: 'layout',
  defaults: { toggleMenu: false },
})
@Injectable()
export class LayoutState {
  @Selector()
  static toggleMenu({ toggleMenu }: LayoutStateModel): boolean {
    return toggleMenu;
  }

  @Action(ToggleMenuAction)
  toggleMenu(ctx: StateContext<LayoutStateModel>): void {
    ctx.setState(toggleMenuOperator());
  }
}
