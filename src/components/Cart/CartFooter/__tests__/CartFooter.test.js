import { configureStore, createSlice } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { formatPrice } from '../../../../helpers/utils/formatData';
import testProducts from '../../../../test-utils/dto/productsDto';
import renderWithStore, {
  screen,
} from '../../../../test-utils/renderWithStore';
import { CartFooter } from '../CartFooter';

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
        `Total Price: ${formatPrice(initialCart.totalPrice)}`
      );
    });
  });
});
