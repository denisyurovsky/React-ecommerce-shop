import { http } from './setup';

export function getSomeProducts({
  sortField = 'id',
  sortType = 'asc',
  startPage = 0,
  endPage = 1,
}) {
  return http.get(
    `/products?_sort=${sortField}&_order=${sortType}&_start=${startPage}&_end=${endPage}`
  );
}

export function getAllProducts() {
  return http.get('/products');
}
