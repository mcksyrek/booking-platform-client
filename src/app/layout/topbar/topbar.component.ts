import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'booking-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent {
  openMenu(): void {
    alert('open menu');
  }
}
