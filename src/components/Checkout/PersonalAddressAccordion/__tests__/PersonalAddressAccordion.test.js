import React from 'react';

import { EMPTY_ADDRESS } from '../../../../pages/AddressBookPage/constants/constants';
import { CheckoutContext } from '../../../../pages/CheckoutPage/CheckoutPage';
import renderWith from '../../../../test-utils/renderWith';
import { PANEL } from '../../constants/constants';
import PersonalAddressAccordion from '../PersonalAddressAccordion';

describe('PersonalAddressAccordion component', () => {
  it('should render valid snapshot', () => {
    const { asFragment } = renderWith(
      <CheckoutContext.Provider value={[{ address: false }]}>
        <PersonalAddressAccordion
          address={EMPTY_ADDRESS}
          isPersonalAddressValid={false}
          isPersonalInformationValid={true}
          orderId={null}
          expanded={PANEL.PERSONAL_ADDRESS}
          handleChangeAccordion={jest.fn()}
          setAddress={jest.fn()}
          handleChange={jest.fn()}
          setIsPaymentMethodDisabled={jest.fn()}
          setExpanded={jest.fn()}
          setCreatedOrderId={jest.fn()}
        />
      </CheckoutContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
