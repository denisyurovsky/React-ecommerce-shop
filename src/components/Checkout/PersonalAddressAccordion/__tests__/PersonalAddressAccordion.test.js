import React from 'react';

import { EMPTY_ADDRESS } from '../../../../pages/AddressBookPage/constants/constants';
import renderWith from '../../../../test-utils/renderWith';
import { PANEL } from '../../constants/constants';
import PersonalAddressAccordion from '../PersonalAddressAccordion';

describe('PersonalAddressAccordion component', () => {
  it('should render valid snapshot', () => {
    const { asFragment } = renderWith(
      <PersonalAddressAccordion
        address={EMPTY_ADDRESS}
        isDeliveryAddressDisabled={false}
        isPersonalAddressValid={false}
        isPersonalInformationValid={true}
        orderId={null}
        expanded={PANEL.PERSONAL_ADDRESS}
        handleChangeAccordion={() => {}}
        setAddress={() => {}}
        handleChange={() => {}}
        setIsPaymentMethodDisabled={() => {}}
        setExpanded={() => {}}
        setCreatedOrderId={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
