import { IOffer } from '../offer.interface';

export class AddOfferAction {
  static readonly type = '[Offers] Add new offer';

  constructor(public readonly offer: IOffer) {}
}

export class GetOfferListAction {
  static readonly type = '[Offers] Get offers list';
}

export class GetOfferByIdAction {
  static readonly type = '[Offers] Get offer by ID';

  constructor(public readonly id: number) {}
}

export class DeleteOfferAction {
  static readonly type = '[Offers] Delete offer';

  constructor(public readonly id: number) {}
}

export class UpdateOfferAction {
  static readonly type = '[Offers] Edit offer';

  constructor(public readonly updatedOffer: IOffer) {}
}

export class UnselectOfferAction {
  static readonly type = '[Offers] Unselect offer';
}

export class SetCustomizedOffersAction {
  static readonly type = '[Offers] Set customized offers list';

  constructor(public readonly customizedOffersList: IOffer[]) {}
}
