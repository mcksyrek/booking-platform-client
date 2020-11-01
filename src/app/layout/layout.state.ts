import {
  State,
  Action,
  StateContext,
  Selector,
  StateOperator,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch } from '@ngxs/store/operators';

import { ToggleMenuAction } from './layout.actions';
import { toggle } from '@booking/shared/store/operators';

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
    ctx.setState(
      patch({
        toggleMenu: toggle(),
      })
    );
  }
}
