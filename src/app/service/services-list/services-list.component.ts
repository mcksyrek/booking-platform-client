import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ServicesState } from '@state/services.state';
import { IService } from '../shared/service.interface';

@Component({
  selector: 'booking-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesListComponent {
  @Select(ServicesState.getServices)
  readonly services$: Observable<IService[]>;
}
