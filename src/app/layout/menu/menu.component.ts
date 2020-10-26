import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { LayoutService } from '../layout.service';
import { MENU_LIST_ITEMS } from './menu.constant';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';

@Component({
  selector: 'booking-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent extends AbstractSubscriber
  implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  readonly menuList = MENU_LIST_ITEMS;

  constructor(
    private _layoutService: LayoutService,
    private _changeDetector: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscriber.add(
      this._layoutService.menuAction$.subscribe(() => this.toggleMenu())
    );
  }

  toggleMenu(): void {
    this.sidenav.toggle();
    this._changeDetector.markForCheck();
  }
}
