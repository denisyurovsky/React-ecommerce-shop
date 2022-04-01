import { Role, Gender } from '../enums/enums';

import { Cart } from './cart.model';
import { Wishlist } from './wishlist.model';

export interface DraftUser {
  email: string;
  password: string;
  role: Role;
  addresses: number[];
  wishlists?: Wishlist[];
}

export interface RegisteredUser {
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegistredUserWithoutId extends RegisteredUser {
  avatar: string;
  phoneNumber: string;
  gender: Gender;
  dateOfBirth: Date | null;
  addresses: number[];
  cart?: Cart;
  wishlists?: Wishlist[];
}

export interface User extends RegistredUserWithoutId {
  id: number;
}
