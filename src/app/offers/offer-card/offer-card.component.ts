import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { IOffer } from '../offer.interface';
import { Endpoints } from '@booking/shared/enums/endpoints.enum';

@Component({
  selector: 'booking-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent {
  @Input() readonly offer: IOffer;

  getSource(): string {
    return `/assets/icons/${this.offer.category}.svg`;
  }

  getRedirectLink(): string[] {
    return [`${Endpoints.Offers}/${this.offer.id}`];
  }
}
