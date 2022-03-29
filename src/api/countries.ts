import { Countries } from './../ts/models/countries.model';
import { http } from './setup';

const countriesApi = {
  get() {
    return http.get<Countries[]>('/countries');
  },
};

export default countriesApi;
