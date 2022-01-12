import { USER_ROLE } from '../helpers/constants/constants';

import { http } from './setup';

export const login = ({ email, password }) =>
  http.post('login', { email, password });

export const register = ({ email, password, firstName, lastName }) =>
  http.post('register', {
    email,
    password,
    firstName,
    lastName,
    role: USER_ROLE.CONSUMER,
  });
