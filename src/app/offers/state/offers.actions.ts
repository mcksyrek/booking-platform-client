import { IOffer } from '../offer.interface';

export class AddOfferAction {
  static readonly type = '[Offers] Add new offer';

  constructor(public readonly offer: IOffer) {}
}

export class GetOfferListAction {
  static readonly type = '[Offers] Get offers list';
}
