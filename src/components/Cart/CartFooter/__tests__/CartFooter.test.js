import React from 'react';

import { formatPrice } from '../../../../helpers/utils/formatData';
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
      const { asFragment } = renderWith(<CartFooter buyHandler={() => {}} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Tests for valid describing data from store', () => {
    it('Total price equal to price from store', () => {
      renderWith(<CartFooter buyHandler={() => {}} />, preloadedState);
      const totalPrice = screen.getByTestId('totalPrice');

      expect(totalPrice.textContent).toBe(
        `Total Price: ${formatPrice(testCart.totalDiscountPrice)}`
      );

      const totalDiscountPrice = screen.getByTestId('savedMoney');

      expect(totalDiscountPrice.textContent).toBe(
        `You saved: ${formatPrice(
          testCart.totalPrice - testCart.totalDiscountPrice
        )}`
      );
    });
  });
});
