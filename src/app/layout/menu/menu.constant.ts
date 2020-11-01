import { Routes } from '@booking/shared/enums/routes.enum';

interface IMenuItem {
  name: string;
  route: string;
}

export const MENU_LIST_ITEMS: IMenuItem[] = [
  { name: 'Browse offers', route: Routes.Offers + Routes.All },
  { name: 'Create new offer', route: Routes.Offers + Routes.New },
];
