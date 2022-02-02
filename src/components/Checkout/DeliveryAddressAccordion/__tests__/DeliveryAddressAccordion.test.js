import React from 'react';

import { EMPTY_ADDRESS } from '../../../../pages/AddressBookPage/constants/constants';
import { addressesDto } from '../../../../test-utils/dto/addressesDto';
import renderWith from '../../../../test-utils/renderWith';
import DeliveryAddressAccordion from '../DeliveryAddressAccordion';

describe('DeliveryAddressAccordion component', () => {
  it('should render valid snapshot', () => {
    const { asFragment } = renderWith(
      <DeliveryAddressAccordion
        handleDeliveryAddressButton={() => {}}
        handleChangeAddresses={() => {}}
        handleEditButton={() => {}}
        handleChangeAccordion={() => {}}
        isDeliveryAddressExpended={true}
        addressId={null}
        addresses={{ data: addressesDto }}
        address={EMPTY_ADDRESS}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
