import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { IOffer } from '../offer.interface';
import { Endpoints } from '@booking/shared/enums/endpoints.enum';
import { ICON_PATH } from '@booking/shared/constants/icons.constant';

@Component({
  selector: 'booking-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent {
  @Input() readonly offer: IOffer;

  constructor(private _router: Router) {}

  getSource(): string {
    return `/${ICON_PATH}/${this.offer.category}.svg`;
  }

  redirectToOffer(): void {
    const offerLink = `${Endpoints.Offers}/${this.offer.id}`;
    this._router.navigateByUrl(offerLink);
  }
}
