import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { MatSidenav } from '@angular/material/sidenav';

import { ALL_LIST_ITEMS, USER_LIST_ITEMS } from './menu.constant';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { LayoutState } from '../layout.state';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { AuthState } from '@booking/auth/auth.state';

@Component({
  selector: 'booking-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent extends AbstractSubscriber implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  readonly allMenuList = ALL_LIST_ITEMS;
  readonly userMenuList = USER_LIST_ITEMS;

  @Select(LayoutState.toggleMenu)
  toggleMenu$: Observable<boolean>;

  @Select(AuthState.isLogged)
  readonly isLogged$: Observable<boolean>;

  constructor(private _changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this._subscriber.add(
      this.toggleMenu$.pipe(skip(1)).subscribe(() => this.toggleMenu())
    );
  }

  toggleMenu(): void {
    // TODO create directive for this issue
    this.sidenav.toggle();
    this._changeDetector.markForCheck();
  }
}
