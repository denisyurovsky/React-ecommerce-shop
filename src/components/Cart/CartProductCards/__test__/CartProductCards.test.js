import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import testProducts from '../../../../test-utils/dto/productsDto';
import RouterConnected from '../../../../test-utils/RouterConnected';
import { CartProductCards } from '../CartProductCards';

let initialCart = {
  products: [
    {
      productId: testProducts[0].id,
      price: testProducts[0].price,
      quantity: 1,
      checked: true,
    },
    {
      productId: testProducts[1].id,
      price: testProducts[1].price,
      quantity: 1,
      checked: true,
    },
    {
      productId: testProducts[2].id,
      price: testProducts[2].price,
      quantity: 1,
      checked: true,
    },
  ],
  totalQuantity: 3,
  totalPrice:
    testProducts[0].price + testProducts[1].price + testProducts[2].price,
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

describe('CartProductCards component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <RouterConnected
            component={
              <CartProductCards
                openModal={() => {}}
                setModalProduct={() => {}}
              />
            }
          />
        </Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
