export interface IOffer {
  id: number;
  name: string;
  author?: string;
  address?: string;
  city: string;
  postalCode?: string;
  phoneNumber?: number;
  category: string;
  description: string;
  postedDate: Date;
}
