import { http } from './setup';

export const getProduct = (id) => {
  return http.get(`products/${id}`);
};
