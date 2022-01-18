import React from 'react';

import { addresses } from '../../../../test-utils/dto/addressesDto';
import { citiesRU } from '../../../../test-utils/dto/citiesDto';
import renderWithStore from '../../../../test-utils/renderWithStore';
import VirtualizedAutocomplete from '../VirtualizedAutocomplete';

describe('VirtualizedAutocomplete component', () => {
  it('should render valid snapshot', () => {
    const { asFragment } = renderWithStore(
      <VirtualizedAutocomplete
        data={citiesRU.cities}
        setAddress={() => {}}
        address={addresses[0]}
        label="Cities"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
