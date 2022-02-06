import buildSearchQuery from '../helpers/buildSearchQuery';

import { http } from './setup';

export function getSomeProducts(searchParams) {
  const { entity, filters, sort, text, currentPage, itemsPerPage } =
    searchParams;

  return http.get(
    buildSearchQuery(entity, filters, sort, text, currentPage, itemsPerPage)
  );
}

export function getProductsByAuthorId(id) {
  return http.get(`/products/?userId=${id}`);
}

export function getAllProducts() {
  return http.get('/products');
}

export const getProductsByIds = (ids) => {
  const reqParams = 'id=' + ids.join('&id=');

  return http.get(`/products/?${reqParams}`);
};
