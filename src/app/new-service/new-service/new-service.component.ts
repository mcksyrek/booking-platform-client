import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'booking-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewServiceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
