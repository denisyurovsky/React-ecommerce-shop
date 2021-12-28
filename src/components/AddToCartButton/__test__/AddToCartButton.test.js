import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Provider } from 'react-redux';

import {
  addProduct,
  decreaseProduct,
  getCart,
} from '../../../store/cart/cartSlice';
import testCards from '../../../test-utils/dto/productsDto';
import { testUser, userWithEmptyCart } from '../../../test-utils/dto/userDto';
import renderWithStore from '../../../test-utils/renderWithStore';
import { AddToCartButton } from '../AddToCartButton';

const serverUser = {
  ...testUser,
};

const initialUser = {
  user: {
    id: 1,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {},
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: userWithEmptyCart.cart,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        state.totalQuantity = action.payload.totalQuantity;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload.cart.products;
        state.totalQuantity = action.payload.cart.totalQuantity;
        state.totalPrice = action.payload.cart.totalPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(decreaseProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decreaseProduct.fulfilled, (state, action) => {
        state.products = action.payload.cart.products;
        state.totalQuantity = action.payload.cart.totalQuantity;
        state.totalPrice = action.payload.cart.totalPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(decreaseProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      });
  },
});

const userReducer = userSlice.reducer;
const cartReducer = cartSlice.reducer;

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

const successfulHandlers = [
  rest.put('/cart/1', (req, res, ctx) => {
    serverUser.cart = req.body.cart;

    return res(ctx.status(200), ctx.json(serverUser));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(serverUser));
  }),
];

describe('AddToCartButton component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = renderWithStore(
        <AddToCartButton product={testCards[0]} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('valid behaviour of buttons when server responds', () => {
    const server = setupServer(...successfulHandlers);

    beforeAll(() => {
      server.listen();
    });
    afterAll(() => server.close());
    it('reacts on + clicks correctly', async () => {
      render(
        <Provider store={store}>
          <AddToCartButton product={testCards[2]} />
        </Provider>
      );

      const addButton = await screen.findByText('+ add to cart');

      fireEvent.click(addButton);
      const valueFromServer = await screen.findByText('1');

      expect(valueFromServer).toBeInTheDocument();
    });

    it('reacts on - clicks correctly', async () => {
      render(
        <Provider store={store}>
          <AddToCartButton product={testCards[2]} />
        </Provider>
      );

      const addButton = await screen.findByText('+');

      fireEvent.click(addButton);

      expect(await screen.findByText('2')).toBeInTheDocument();
      const decreaseButton = await screen.findByText('-');

      fireEvent.click(decreaseButton);

      expect(await screen.findByText('1')).toBeInTheDocument();
    });
  });
});
