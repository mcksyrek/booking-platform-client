import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { RemoveSessionDataAction } from '@booking/auth/auth.actions';
import { AuthState } from '@booking/auth/auth.state';
import { Routes } from '@booking/shared/enums';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ToggleMenuAction } from '../layout.actions';

@Component({
  selector: 'booking-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  @Select(AuthState.isLogged)
  readonly isLogged$: Observable<boolean>;

  constructor(private _store: Store, private _router: Router) {}

  toggleMenu(): void {
    this._store.dispatch(new ToggleMenuAction());
  }

  logout(): void {
    localStorage.clear();
    this._store.dispatch(new RemoveSessionDataAction());
    this._router.navigateByUrl(Routes.Auth + Routes.Login);
  }

  login(): void {
    this._router.navigateByUrl(Routes.Auth + Routes.Login);
  }
}
