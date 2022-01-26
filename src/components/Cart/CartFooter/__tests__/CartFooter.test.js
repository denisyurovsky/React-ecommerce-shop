import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { formatPrice } from '../../../../helpers/utils/formatData';
import cartReducer from '../../../../store/cart/cartSlice';
import userReducer from '../../../../store/user/userSlice';
import { testCart } from '../../../../test-utils/dto/cartDto';
import renderWithStore, {
  screen,
} from '../../../../test-utils/renderWithStore';
import { CartFooter } from '../CartFooter';

const initialUser = {
  user: { id: 1 },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState: {
    user: initialUser,
    cart: testCart,
  },
});

describe('CartFooter component', () => {
  describe('Snapshot without data', () => {
    it('renders a valid snapshot without cart in store', () => {
      const { asFragment } = renderWithStore(
        <CartFooter buyHandler={() => {}} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Tests for valid describing data from store', () => {
    it('Total price equal to price from store', () => {
      render(
        <Provider store={store}>
          <CartFooter buyHandler={() => {}} />
        </Provider>
      );
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
