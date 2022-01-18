import React from 'react';

import {
  countries,
  objCountries,
} from '../../../../test-utils/dto/countriesDto';
import renderWithStore from '../../../../test-utils/renderWithStore';
import CountryAutocomplete from '../CountryAutocomplete';

describe('CountryAutocomplete component', () => {
  it('should render valid snapshot', () => {
    const { asFragment } = renderWithStore(
      <CountryAutocomplete
        handleChangeCountry={() => {}}
        country={countries[0]}
        countries={objCountries}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
