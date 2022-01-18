import { http } from './setup';

export function getAllCountries() {
  return http.get('/countries');
}
