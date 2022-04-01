import { defaultWishlists } from '../constants/wishlists/wishlists';
import { Role } from '../ts/enums/enums';

import { http } from './setup';

export const getUser = (userId: number) => http.get(`/users/${userId}`);

export interface Order {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface SetWishlists {
  currentUserId: number | null;
  wishlists: number[];
}

export const login = ({ email, password }: Order) =>
  http.post('login', { email, password });

export const register = ({ email, password, firstName, lastName }: Register) =>
  http.post('register', {
    email,
    password,
    firstName,
    lastName,
    role: Role.Consumer,
    wishlists: defaultWishlists,
  });

export const setWishlists = ({ currentUserId, wishlists }: SetWishlists) => {
  if (!currentUserId) {
    throw new Error('User is unauthorized');
  }

  return http.patch(`users/${currentUserId}`, { wishlists });
};

export const updateProfile = (profile: any) =>
  http.patch(`users/${profile.id}`, profile);
