import { Routes } from '@booking/shared/enums/routes.enum';

interface IMenuItem {
  name: string;
  route: string;
}

export const ALL_LIST_ITEMS: IMenuItem[] = [
  { name: 'Browse offers', route: Routes.Offers + Routes.All },
];

export const USER_LIST_ITEMS: IMenuItem[] = [
  { name: 'Create new offer', route: Routes.Offers + Routes.New },
  {
    name: 'Your reservations',
    route: Routes.Offers + Routes.Reservations + Routes.Client,
  },
  {
    name: 'Your service reservation',
    route: Routes.Offers + Routes.Reservations + Routes.Provider,
  },
];
