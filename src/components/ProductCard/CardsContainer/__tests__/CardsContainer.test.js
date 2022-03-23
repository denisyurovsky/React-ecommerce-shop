import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { REQUEST_STATUS, USER_ROLE } from '../../../../constants/constants';
import cartReducer from '../../../../store/cart/cartSlice';
import productsReducer from '../../../../store/products/productsSlice';
import userReducer from '../../../../store/user/userSlice';
import { testCart } from '../../../../test-utils/dto/cartDto';
import productsDto from '../../../../test-utils/dto/productsDto';
import { wishlistsDto } from '../../../../test-utils/dto/wishlistsDto';
import renderWithStore, {
  screen,
} from '../../../../test-utils/renderWithStore';
import RouterConnected from '../../../../test-utils/RouterConnected';
import CardsContainer from '../CardsContainer';

const handlersFulfilled = rest.patch('/users/6', (req, res, ctx) =>
  res(ctx.json(req.body))
);
const preloadedWishlists = wishlistsDto;
const renderWithFakeUserStore = (wishlists, products, cart) => {
  const preloadedState = {
    user: {
      user: {
        id: 6,
        role: USER_ROLE.CONSUMER,
        wishlists: wishlists,
      },
      updateWishlistsStatus: REQUEST_STATUS.IDLE,
    },
    cart: cart,
  };

  const fakeUserStore = configureStore({
    reducer: {
      user: userReducer,
      products: productsReducer,
      cart: cartReducer,
    },
    preloadedState,
  });

  return renderWithStore(
    <RouterConnected component={<CardsContainer products={products} />} />,
    { store: fakeUserStore }
  );
};

describe('CardsContainer component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot with data', () => {
      const { asFragment } = renderWithFakeUserStore(
        preloadedWishlists,
        productsDto.slice(1, 4),
        testCart
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot without data', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<CardsContainer products={[]} />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('AddToWishListButton render', () => {
  it('consumer should see that only the product with id #2 is not added', () => {
    const { getAllByTestId } = renderWithFakeUserStore(
      preloadedWishlists,
      productsDto.slice(0, 3),
      testCart
    );

    expect(getAllByTestId('FavoriteIcon')).toHaveLength(2);
    expect(getAllByTestId('FavoriteBorderIcon')).toHaveLength(1);
  });

  it('consumer should see that only the product with id #2 is added', () => {
    const { getAllByTestId } = renderWithFakeUserStore(
      preloadedWishlists,
      productsDto.slice(1, 4),
      testCart
    );

    expect(getAllByTestId('FavoriteIcon')).toHaveLength(1);
    expect(getAllByTestId('FavoriteBorderIcon')).toHaveLength(2);
  });
});

describe('AddToWishListButton, case server responds', () => {
  const server = setupServer(handlersFulfilled);

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  it('consumer has the ability to add a product', async () => {
    renderWithFakeUserStore(
      preloadedWishlists,
      productsDto.slice(2, 3),
      testCart
    );
    userEvent.click(screen.getByTestId('FavoriteBorderIcon'));
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');

    userEvent.click(checkboxes[0]);
    userEvent.click(screen.getByTestId('CloseIcon'));
    expect(await screen.findByTestId('FavoriteIcon')).toBeInTheDocument();
  });
  it('consumer has the ability to remove a product', async () => {
    renderWithFakeUserStore(
      preloadedWishlists,
      productsDto.slice(1, 2),
      testCart
    );
    userEvent.click(screen.getByTestId('FavoriteIcon'));
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    const checkboxes = screen.getAllByRole('checkbox');

    userEvent.click(checkboxes[0]);
    userEvent.click(screen.getByTestId('CloseIcon'));
    expect(await screen.findByTestId('FavoriteBorderIcon')).toBeInTheDocument();
  });
});
