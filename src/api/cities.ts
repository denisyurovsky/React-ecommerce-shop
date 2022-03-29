import { Cities } from './../ts/models/cities.model';
import { http } from './setup';

const citiesApi = {
  get(countryCode: string) {
    return http.get<Cities>(`/cities/${countryCode}`);
  },
};

export default citiesApi;
