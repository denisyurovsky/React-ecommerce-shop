import { http } from './setup';

export const login = (email, password) =>
  http.post('login', { email, password });

export const register = ({ password, email, firstName, lastName }) =>
  http.post('register', {
    password,
    email,
    firstName,
    lastName,
  });
