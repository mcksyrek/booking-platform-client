import {
  State,
  Action,
  StateContext,
  Selector,
  StateOperator,
} from '@ngxs/store';
import { Injectable } from '@angular/core';

import { ToggleMenuAction } from './layout.actions';

// tslint:disable-next-line: interface-over-type-literal
type BoolStateObject = {
  [objectKey: string]: boolean;
};

export function toggleBoolStateOperator(
  boolStateObject: BoolStateObject
): StateOperator<LayoutStateModel> {
  return (state: Readonly<LayoutStateModel>) => {
    const objectKey = Object.keys(boolStateObject)[0];
    return { ...state, [objectKey]: !boolStateObject[objectKey] };
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
    const toggleMenu = { toggleMenu: ctx.getState().toggleMenu };
    ctx.setState(toggleBoolStateOperator(toggleMenu));
  }
}
