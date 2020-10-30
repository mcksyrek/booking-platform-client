import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { MatSidenav } from '@angular/material/sidenav';

import { MenuListEnum } from './menu.enum';
import { AbstractSubscriber } from '@booking/shared/classes/abstract-subscriber';
import { LayoutState } from '../layout.state';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'booking-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent extends AbstractSubscriber implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  readonly menuList = Object.values(MenuListEnum);

  @Select(LayoutState.toggleMenu)
  toggleMenu$: Observable<boolean>;

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
