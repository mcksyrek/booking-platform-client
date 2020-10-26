import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { MatSidenav } from '@angular/material/sidenav';

import { MENU_LIST_ITEMS } from './menu.constant';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { LayoutState } from '../layout.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'booking-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent extends AbstractSubscriber implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  readonly menuList = MENU_LIST_ITEMS;

  @Select(LayoutState.getMenuAction) menuAction$: Observable<null>;

  constructor(private _changeDetector: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this._subscriber.add(this.menuAction$.subscribe(() => this.toggleMenu()));
  }

  toggleMenu(): void {
    // TODO create directive for this issue
    this.sidenav.toggle();
    this._changeDetector.markForCheck();
  }
}
