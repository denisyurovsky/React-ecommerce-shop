import buildSearchQuery from '../helpers/buildSearchQuery';

import { http } from './setup';

export const getSomeAddresses = (ids) => {
  const filters = ids.map((id) => ({ id }));

  return http.get(buildSearchQuery('addresses', filters));
};

export const addSomeAddress = (data) => {
  return http.post('/addresses', data);
};

export const editSomeAddress = (data) => {
  return http.put(`/addresses/${data.id}`, data);
};
