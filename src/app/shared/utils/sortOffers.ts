import { IOffer } from '@booking/offers/offer.interface';
import { SortingTypesEnum } from '@booking/shared/enums/';

export function sortOffers(sortType: string, offerList: IOffer[]): IOffer[] {
  switch (sortType) {
    case SortingTypesEnum.Category:
    case SortingTypesEnum.City:
    case SortingTypesEnum.Name:
      return sortByAttribute(sortType)(offerList);

    default:
      return offerList;
  }
}

function sortByAttribute(attribute: string): (offerList: IOffer[]) => IOffer[] {
  return (offerList: IOffer[]): IOffer[] => [
    ...offerList.sort((offer1, offer2) =>
      offer1[attribute].localeCompare(offer2[attribute])
    ),
  ];
}
