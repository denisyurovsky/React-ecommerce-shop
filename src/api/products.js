import { http } from './setup';

export function getAllProducts() {
  return http.get('/products');
}

export function getSomeProducts() {}
