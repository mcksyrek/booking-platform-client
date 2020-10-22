import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

import { LayoutService } from '../layout.service';
import { MENU_LIST_ITEMS } from './menu.constant';

@Component({
  selector: 'booking-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  readonly menuList = MENU_LIST_ITEMS;
  private _subscription = new Subscription();

  constructor(
    private _layoutService: LayoutService,
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._subscription.add(
      this._layoutService.menuAction$.subscribe(() => this.toggleMenu())
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  toggleMenu(): void {
    this.sidenav.toggle();
    this._changeDetector.markForCheck();
  }
}
