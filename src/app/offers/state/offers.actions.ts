import { IOffer } from '../offer.interface';

export class AddOfferAction {
  static readonly type = '[OFFER] Add';

  constructor(public readonly offer: IOffer) {}
}
