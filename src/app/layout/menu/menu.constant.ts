import { Routes } from '@booking/shared/enums/routes.enum';

export const MENU_LIST_ITEMS = [
  { name: 'Browse offers', route: Routes.Offers + Routes.All },
  { name: 'Create new offer', route: Routes.Offers + Routes.New },
];
