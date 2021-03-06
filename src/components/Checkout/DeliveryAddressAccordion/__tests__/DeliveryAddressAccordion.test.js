import React from 'react';

import { EMPTY_ADDRESS } from '../../../../pages/AddressBookPage/constants/constants';
import { CheckoutContext } from '../../../../pages/CheckoutPage/CheckoutPage';
import { addressesDto } from '../../../../test-utils/dto/addressesDto';
import renderWith from '../../../../test-utils/renderWith';
import DeliveryAddressAccordion from '../DeliveryAddressAccordion';

describe('DeliveryAddressAccordion component', () => {
  it('should render valid snapshot', () => {
    const { asFragment } = renderWith(
      <CheckoutContext.Provider value={[{ address: false }]}>
        <DeliveryAddressAccordion
          handleDeliveryAddressButton={jest.fn()}
          handleChangeAddresses={jest.fn()}
          handleEditButton={jest.fn()}
          handleChangeAccordion={jest.fn()}
          isDeliveryAddressExpended={true}
          addressId={null}
          addresses={{ data: addressesDto }}
          address={EMPTY_ADDRESS}
        />
      </CheckoutContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
