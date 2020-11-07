import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from '@booking/shared/enums';
import { Store } from '@ngxs/store';

import { ToggleMenuAction } from '../layout.actions';

@Component({
  selector: 'booking-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  constructor(private _store: Store, private _router: Router) {}

  toggleMenu(): void {
    this._store.dispatch(new ToggleMenuAction());
  }

  logout(): void {
    localStorage.clear();
    this._router.navigateByUrl(Routes.Auth + Routes.Login);
  }
}
