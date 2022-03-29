import { render } from '@testing-library/react';
import React from 'react';

import DiscountBox from '../DiscountBox';

describe('DiscountBox render correct snapshots', () => {
  const sellersDiscount = 1000;
  const personalDiscount = 1500;

  it('should render correct table with seller and personal discounts', () => {
    const { asFragment } = render(
      <DiscountBox
        sellersDiscount={sellersDiscount}
        personalDiscount={personalDiscount}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct table with only seller discount', () => {
    const { asFragment } = render(
      <DiscountBox sellersDiscount={sellersDiscount} personalDiscount={0} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correct table with personal discount', () => {
    const { asFragment } = render(
      <DiscountBox sellersDiscount={0} personalDiscount={personalDiscount} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should return null if discounts equal to 0', () => {
    const { asFragment } = render(
      <DiscountBox sellersDiscount={0} personalDiscount={0} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
