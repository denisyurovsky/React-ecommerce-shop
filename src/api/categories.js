import { http } from './setup';

export function getAllCategories() {
  return http.get('/categories');
}
