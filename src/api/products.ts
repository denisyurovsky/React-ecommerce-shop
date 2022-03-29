import { LoDashImplicitNumberArrayWrapper } from 'lodash';

import buildSearchQuery from '../helpers/buildSearchQuery';

import { Product } from './../ts/models/product.model';
import { http } from './setup';

interface SearchParams {
  entity: string;
  filters: Record<string, string | number>[];
  sort: { field: string; order: string };
  q: string;
  currentPage: number;
  itemsPerPage: number;
}

const productsApi = {
  getSomeProducts(searchParams: SearchParams) {
    const { entity, filters, sort, q, currentPage, itemsPerPage } =
      searchParams;

    return http.get<Product[]>(
      buildSearchQuery(entity, filters, sort, q, currentPage, itemsPerPage)
    );
  },
  getProductsByAuthorId(id: LoDashImplicitNumberArrayWrapper) {
    return http.get<Product[]>(`/products/?userId=${id}`);
  },
  getProductsByIds(ids: number[], abortControl: any = {}) {
    const reqParams = 'id=' + ids.join('&id=');

    return new Promise((resolve, reject) => {
      if (abortControl.signal) {
        abortControl.signal.addEventListener('abort', (event: any) => {
          reject(event);
        });
      }

      const result = http.get<Product[]>(`/products/?${reqParams}`);

      resolve(result);
    });
  },
};

export default productsApi;
