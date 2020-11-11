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
  postedDate?: Date;
  products?: IProduct[];
}

export interface IProduct {
  name: string;
  duration: number;
  price: number;
}

export interface IReservation {
  product: string;
  hour: number;
  duration?: number;
  date?: string;
  clientName?: string;
  clientPhone?: string | number;
  offerId?: string;
}
