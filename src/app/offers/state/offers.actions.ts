import { IOffer } from '../offer.interface';

export class AddOfferAction {
  static readonly type = '[OFFER] Add';

  constructor(public readonly offer: IOffer) {}
}

export class GetOfferListAction {
  // TODO naming of actions' type
  static readonly type = '[OFFER] Get offers list';
}
