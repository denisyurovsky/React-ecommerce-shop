import { http } from './setup';

export const getSomeCities = (countryCode) =>
  http.get(`/cities/${countryCode}`);
