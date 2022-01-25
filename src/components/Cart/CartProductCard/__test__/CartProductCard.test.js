import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import testProducts from '../../../../test-utils/dto/productsDto';
import { CartProductCard } from '../CartProductCard';

let initialCart = {
  products: [
    {
      productId: testProducts[0].id,
      price: testProducts[0].price,
      quantity: 1,
      checked: true,
    },
  ],
  totalQuantity: 1,
  totalPrice: testProducts[0].price,
  isLoading: false,
  errorOccurred: false,
};

const initialUser = {
  user: { id: 1 },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {},
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {},
});

const cartReducer = cartSlice.reducer;
const userReducer = userSlice.reducer;

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
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
