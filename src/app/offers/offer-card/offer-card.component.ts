import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { IOffer } from '../offer.interface';

@Component({
  selector: 'booking-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferCardComponent {
  @Input() readonly offer: IOffer;
  @Output() readonly update = new EventEmitter<IOffer>();
  @Output() readonly delete = new EventEmitter<IOffer>();

  editing = false;

  toggleEditing(): void {
    this.editing = !this.editing;
  }

  updateOffer(updatedOffer: IOffer): void {
    this.update.emit(updatedOffer);
    this.editing = false;
  }

  deleteOffer(): void {
    this.delete.emit(this.offer);
  }
}
