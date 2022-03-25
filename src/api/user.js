import { defaultWishlists } from '../constants/wishlists/wishlists';
import { Role } from '../ts/enums/enums';

import { http } from './setup';

export const getUser = (userId) => http.get(`/users/${userId}`);

export const login = ({ email, password }) =>
  http.post('login', { email, password });

export const register = ({ email, password, firstName, lastName }) =>
  http.post('register', {
    email,
    password,
    firstName,
    lastName,
    role: Role.Consumer,
    wishlist: defaultWishlists,
  });

export const setWishlists = ({ currentUserId, wishlists }) => {
  if (!currentUserId) {
    throw new Error('User is unauthorized');
  }

  return http.patch(`users/${currentUserId}`, { wishlists });
};

export const updateProfile = (profile) =>
  http.patch(`users/${profile.id}`, profile);
