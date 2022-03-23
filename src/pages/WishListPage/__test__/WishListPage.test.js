import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Provider } from 'react-redux';

import { authStatus } from '../../../constants/authConstants';
import { USER_ROLE } from '../../../constants/constants';
import cartReducer from '../../../store/cart/cartSlice';
import productsReducer from '../../../store/products/productsSlice';
import userReducer from '../../../store/user/userSlice';
import testProducts from '../../../test-utils/dto/productsDto';
import { wishlistsDto } from '../../../test-utils/dto/wishlistsDto';
import renderWithStore from '../../../test-utils/renderWithStore';
import RouterConnected from '../../../test-utils/RouterConnected';
import { WishListPage } from '../WishListPage';

const { FULFILLED } = authStatus;

const serverUser = {
  id: 1,
  wishlists: wishlistsDto,
};
const initialUser = {
  user: {
    id: 1,
    wishlists: wishlistsDto,
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
    it('renders a WishListPage snapshot with only one wishlist - default', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<WishListPage />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('renders a WishListPage snapshot with several wishlists', async () => {
      serverFulfilled.listen();
      const { asFragment } = render(
        <Provider store={store}>
          <RouterConnected component={<WishListPage />} />
        </Provider>
      );

      expect(asFragment()).toMatchSnapshot();

      serverFulfilled.resetHandlers();
      serverFulfilled.close();
    });
  });

  describe('test actions', () => {
    beforeAll(() => serverFulfilled.listen());
    afterAll(() => serverFulfilled.close());

    it('should show product cards', async () => {
      render(
        <Provider store={store}>
          <RouterConnected component={<WishListPage />} />
        </Provider>
      );
      const expandButtons = screen.getAllByTestId('ExpandMoreIcon');

      userEvent.click(expandButtons[0]);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(
        await screen.findByText(/Intelligent Cotton Pants/i)
      ).toBeInTheDocument();
    });

    it('should delete wishlist', async () => {
      render(
        <Provider store={store}>
          <RouterConnected component={<WishListPage />} />
        </Provider>
      );
      expect(screen.getByText('Gifts for the wife')).toBeInTheDocument();
      const deleteButtons = screen.getAllByTestId('delete');

      userEvent.click(deleteButtons[0]);
      userEvent.click(screen.getByRole('button', { name: 'Yes' }));
      expect(await screen.findAllByTestId('wishlist-name')).toHaveLength(2);
    });

    it('should edit wishlist', async () => {
      render(
        <Provider store={store}>
          <RouterConnected component={<WishListPage />} />
        </Provider>
      );
      expect(screen.getByText('Default wishlist')).toBeInTheDocument();
      const editButtons = screen.getAllByTestId('edit');

      userEvent.click(editButtons[0]);
      const input = screen.getByLabelText('Wishlist Name');

      fireEvent.focus(input);
      userEvent.type(input, 'New name wishlist');
      fireEvent.blur(input);
      const wishlists = await screen.findAllByTestId('wishlist-name');

      expect(wishlists).toHaveLength(2);
      expect(wishlists[0]).toHaveTextContent('New name wishlist');
    });
  });
});
