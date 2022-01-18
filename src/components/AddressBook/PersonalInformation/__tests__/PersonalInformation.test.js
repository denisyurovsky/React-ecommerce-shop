import React from 'react';

import { addresses } from '../../../../test-utils/dto/addressesDto';
import renderWithStore from '../../../../test-utils/renderWithStore';
import PersonalInformation from '../PersonalInformation';

describe('PersonalInformation component', () => {
  it('should render valid snapshot', () => {
    const { asFragment } = renderWithStore(
      <PersonalInformation
        handleChange={() => {}}
        address={addresses[0]}
        setAddress={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
