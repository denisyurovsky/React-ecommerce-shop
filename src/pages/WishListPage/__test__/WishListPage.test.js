import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Provider } from 'react-redux';

import { authStatus } from '../../../constants/authConstants';
import { USER_ROLE, notificationError } from '../../../constants/constants';
import cartReducer from '../../../store/cart/cartSlice';
import productsReducer from '../../../store/products/productsSlice';
import userReducer from '../../../store/user/userSlice';
import testProducts from '../../../test-utils/dto/productsDto';
import renderWithStore from '../../../test-utils/renderWithStore';
import RouterConnected from '../../../test-utils/RouterConnected';
import { WishListPage } from '../WishListPage';

const { FULFILLED } = authStatus;

const getStore = (wishlist) => {
  const initialCart = {
    sellers: {},
    totalPrice: 0,
    totalQuantity: 0,
  };

  const initialUser = {
    user: {
      id: 1,
      wishlist: wishlist,
      amountOfTries: 0,
      role: USER_ROLE.CONSUMER,
    },
    loginStatus: FULFILLED,
  };

  return configureStore({
    reducer: {
      user: userReducer,
      products: productsReducer,
      cart: cartReducer,
    },
    preloadedState: {
      user: initialUser,
      cart: initialCart,
    },
  });
};

const serverFulfilled = setupServer(
  rest.get('/products/', (req, res, ctx) => {
    const response = [];

    if (req.url.searchParams) {
      req.url.searchParams.forEach((item) => {
        response.push(testProducts[item]);
      });
    }

    return res(ctx.json(response), ctx.status(200));
  })
);

const serverError = setupServer(
  rest.get('/products/', (req, res, ctx) => res(ctx.status(400)))
);

describe('server is responding', () => {
  beforeAll(() => serverFulfilled.listen());
  afterAll(() => serverFulfilled.close());

  it('should show empty message', async () => {
    renderWithStore(<RouterConnected component={<WishListPage />} />, {
      store: getStore([]),
    });

    expect(
      await screen.findByText('Your Wishlist is empty')
    ).toBeInTheDocument();
  });

  it('renders a correct wishlist products', async () => {
    render(
      <Provider store={getStore([1, 2])}>
        <RouterConnected component={<WishListPage />} />
      </Provider>
    );

    await screen.findByText(testProducts[1].name);

    expect(
      screen.getAllByRole('button', { exact: false, name: /to cart$/i })
    ).toHaveLength(2);
  });
});

describe('server sends error', () => {
  beforeAll(() => serverError.listen());
  afterAll(() => serverError.close());

  it('should show error notification', async () => {
    renderWithStore(<RouterConnected component={<WishListPage />} />, {
      store: getStore([1]),
    });

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(notificationError);
    });
  });
});
