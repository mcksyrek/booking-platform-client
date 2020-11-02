import { IOffer } from '@booking/offers/offer.interface';

export function filterOffersByAttribute(
  attribute: string,
  allowedValues: string[],
  offersList: IOffer[]
): IOffer[] {
  return offersList.filter(offer => allowedValues.includes(offer[attribute]));
}
