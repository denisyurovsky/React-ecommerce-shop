import { render } from '@testing-library/react';
import React from 'react';

import TotalPriceBox from '../TotalPriceBox';

const cartWithDiscount = {
  totalPrice: 1000,
  totalDiscountPrice: 500,
  sellersDiscount: 200,
  personalDiscount: 300,
};

const cartWithoutDiscount = {
  totalPrice: 1000,
  totalDiscountPrice: 1000,
  sellersDiscount: 0,
  personalDiscount: 0,
};

describe('TotalPriceBox render correct snapshots', () => {
  it('should render a valid snapshot with discounts', () => {
    const { asFragment } = render(<TotalPriceBox cart={cartWithDiscount} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a valid snapshot without discounts', () => {
    const { asFragment } = render(<TotalPriceBox cart={cartWithoutDiscount} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
