import { IOffer } from '@booking/offers/offer.interface';
import { SortingTypesEnum } from '@booking/shared/enums/';

export function sortOffers(sortType: string, offerList: IOffer[]): IOffer[] {
  switch (sortType) {
    case SortingTypesEnum.Category:
    case SortingTypesEnum.City:
    case SortingTypesEnum.Name:
      return sortByAttributeValue<IOffer>(sortType)(offerList);

    default:
      return offerList;
  }
}

function sortByAttributeValue<T>(attribute: string): (objectList: T[]) => T[] {
  return (objectList: T[]): T[] => [
    ...objectList.sort((object1, object2) =>
      object1[attribute].localeCompare(object2[attribute])
    ),
  ];
}
