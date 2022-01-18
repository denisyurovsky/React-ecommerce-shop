import React from 'react';

import { addresses } from '../../../../test-utils/dto/addressesDto';
import renderWithStore from '../../../../test-utils/renderWithStore';
import AddressCard from '../AddressCard';

describe('AddressCard component', () => {
  it('should render valid snapshot', () => {
    const { asFragment } = renderWithStore(
      <AddressCard
        handleOpenModal={() => {}}
        setModalType={() => {}}
        setAddress={() => {}}
        address={addresses[0]}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
