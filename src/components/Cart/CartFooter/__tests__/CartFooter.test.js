import React from 'react';

import { formatPrice } from '../../../../helpers/formatData';
import { testCart } from '../../../../test-utils/dto/cartDto';
import renderWith, { screen } from '../../../../test-utils/renderWith';
import { CartFooter } from '../CartFooter';

const initialUser = {
  user: { id: 1 },
};

const preloadedState = {
  user: initialUser,
  cart: testCart,
};

describe('CartFooter component', () => {
  describe('Snapshot without data', () => {
    it('renders a valid snapshot without cart in store', () => {
      const { asFragment } = renderWith(<CartFooter />);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Tests for valid describing data from store', () => {
    it('Total price equal to price from store', async () => {
      renderWith(<CartFooter />, preloadedState);

      const totalPrice = screen.getByTestId('totalPrice');

      expect(totalPrice.textContent).toBe(
        `Total:\u00A0${formatPrice(testCart.totalDiscountPrice)}`
      );
    });
  });
});
