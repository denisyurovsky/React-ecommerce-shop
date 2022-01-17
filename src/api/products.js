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

export const getProductsByIds = (ids, abortControl = {}) => {
  const reqParams = 'id=' + ids.join('&id=');

  return new Promise((resolve, reject) => {
    if (abortControl.signal) {
      abortControl.signal.addEventListener('abort', (event) => {
        reject(event);
      });
    }

    const result = http.get(`/products/?${reqParams}`);

    resolve(result);
  });
};
