import React from 'react';

import { EMPTY_ADDRESS } from '../../../../pages/AddressBookPage/constants/constants';
import renderWith from '../../../../test-utils/renderWith';
import { PANEL } from '../../constants/constants';
import PersonalInformationAccordion from '../PersonalInformationAccordion';

describe('PersonalInformationAccordion component', () => {
  it('should render valid snapshot', () => {
    const { asFragment } = renderWith(
      <PersonalInformationAccordion
        handleChangeAccordion={() => {}}
        handlePersonalInformationButton={() => {}}
        handleChange={() => {}}
        setAddress={() => {}}
        expanded={PANEL.PERSONAL_INFORMATION}
        isPersonalInformationValid={false}
        address={EMPTY_ADDRESS}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
