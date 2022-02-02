import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Provider } from 'react-redux';

import { authStatus } from '../../../helpers/constants/authConstants';
import { USER_ROLE } from '../../../helpers/constants/constants';
import cartReducer from '../../../store/cart/cartSlice';
import productsReducer from '../../../store/products/productsSlice';
import userReducer from '../../../store/user/userSlice';
import testProducts from '../../../test-utils/dto/productsDto';
import renderWithStore from '../../../test-utils/renderWithStore';
import RouterConnected from '../../../test-utils/RouterConnected';
import { WishListPage } from '../WishListPage';

const { FULFILLED } = authStatus;

const serverUser = {
  id: 1,
  wishlist: [1, 2, 3],
};
const initialUser = {
  user: {
    id: 1,
    wishlist: [1, 2],
    amountOfTries: 0,
    role: USER_ROLE.CONSUMER,
  },
  loginStatus: FULFILLED,
};

const initialCart = {
  sellers: {},
  totalPrice: 0,
  totalQuantity: 0,
};

const stateForTests = {
  user: initialUser,
  cart: initialCart,
};

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState: stateForTests,
});

const handlersFulfilled = [
  rest.patch('/users/:userId', (req, res, ctx) => {
    return res(ctx.json(serverUser));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.json(serverUser));
  }),
  rest.get('/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;

    return res(ctx.json(testProducts[productId]), ctx.status(200));
  }),
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json(testProducts), ctx.status(200));
  }),
  rest.get('/products/', (req, res, ctx) => {
    const response = [];

    if (req.url.searchParams) {
      req.url.searchParams.forEach((item) => {
        response.push(testProducts[item]);
      });
    }

    return res(ctx.json(response), ctx.status(200));
  }),
];

const serverFulfilled = setupServer(...handlersFulfilled);

describe('WishListPage component', () => {
  describe('snapshots', () => {
    it('renders a WishListPage snapshot without products', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<WishListPage />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a WishListPage snapshot with products', async () => {
      serverFulfilled.listen();
      const { asFragment } = render(
        <Provider store={store}>
          <RouterConnected component={<WishListPage />} />
        </Provider>
      );

      const likeButtons = await screen.findAllByTestId('FavoriteIcon');

      const likeButtonsInTheDoc = likeButtons.length > 0;

      expect(likeButtonsInTheDoc).toEqual(true);

      expect(asFragment()).toMatchSnapshot();

      serverFulfilled.resetHandlers();
      serverFulfilled.close();
    });
  });
  describe('deleting from wishlist', () => {
    it('update wishlist on click', async () => {
      serverFulfilled.listen();

      render(
        <Provider store={store}>
          <RouterConnected component={<WishListPage />} />
        </Provider>
      );

      const firstCardHeader = await screen.findByText(
        'Incredible Plastic Table'
      );

      expect(firstCardHeader).toBeInTheDocument();

      expect(store.getState().user.user.wishlist.length).toEqual(2);

      const likeButtons = await screen.findAllByTestId('FavoriteIcon');

      expect(likeButtons.length).toBe(2);

      userEvent.click(likeButtons[0]);

      const test = await screen.findAllByText('Incredible Plastic Table');

      expect(test.length).toBe(1);

      const test3 = await screen.findAllByText('Intelligent Cotton Pants');

      expect(test3.length).toBe(1);

      const newLikeIcons = await screen.findAllByTestId('FavoriteIcon');

      expect(newLikeIcons.length).toBe(3);

      serverFulfilled.resetHandlers();
      serverFulfilled.close();
    });
  });
});
