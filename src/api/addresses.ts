import buildSearchQuery from '../helpers/buildSearchQuery';

import { Address } from './../ts/models/addresses.model';
import { http } from './setup';

const addressApi = {
  getAddresses(ids: number[]) {
    const filters = ids.map((id) => ({ id }));

    return http.get<Address[]>(buildSearchQuery('addresses', filters));
  },
  get(id: number) {
    return http.get<Address>(`/addresses/${id}`);
  },
  add(data: Address) {
    return http.post<Address>('/addresses', data);
  },
  edit(data: Address) {
    return http.put<Address>(`/addresses/${data.id}`, data);
  },
  delete(id: number) {
    return http.delete<void>(`/addresses/${id}`);
  },
};

export default addressApi;
