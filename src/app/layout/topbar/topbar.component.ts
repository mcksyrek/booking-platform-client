import { Component, ChangeDetectionStrategy } from '@angular/core';

import { LayoutService } from '../layout.service';

@Component({
  selector: 'booking-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  constructor(private _layoutService: LayoutService) {}

  toggleMenu(): void {
    this._layoutService.toggleMenu();
  }
}
