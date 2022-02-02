import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import cartReducer from '../../../../store/cart/cartSlice';
import userReducer from '../../../../store/user/userSlice';
import { testCart } from '../../../../test-utils/dto/cartDto';
import testProducts from '../../../../test-utils/dto/productsDto';
import { CartProductCard } from '../CartProductCard';

const initialUser = {
  user: { id: 1 },
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState: {
    cart: testCart,
    user: initialUser,
  },
});

describe('CartProductCard component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <CartProductCard
            product={testProducts[0]}
            openModal={() => {}}
            setModalProduct={() => {}}
          />
        </Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
