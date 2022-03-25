import { Title } from '../enums/enums';

interface AddressCountry {
  id: string;
  name: string;
}

export interface OrderAddress {
  title: Title;
  name: string;
  surname: string;
  country: AddressCountry;
  city: string;
  street: string;
  building: string;
  flat: string;
  phone: string;
  zip: string;
}

export interface DraftAddress extends OrderAddress {
  id: number;
}

export interface Address extends DraftAddress {
  createdAt: Date;
  updatedAt: Date;
}
