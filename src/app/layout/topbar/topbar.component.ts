import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';

import { ToggleMenuAction } from '../layout.actions';

@Component({
  selector: 'booking-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  constructor(private _store: Store) {}

  toggleMenu(): void {
    this._store.dispatch(new ToggleMenuAction());
  }
}
