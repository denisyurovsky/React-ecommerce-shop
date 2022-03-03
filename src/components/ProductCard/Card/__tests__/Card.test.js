import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

import { REQUEST_STATUS, USER_ROLE } from '../../../../constants/constants';
import { pageView } from '../../../../pages/ProductListPage/constants/constants';
import cartReducer from '../../../../store/cart/cartSlice';
import productsReducer from '../../../../store/products/productsSlice';
import userReducer from '../../../../store/user/userSlice';
import { testCart } from '../../../../test-utils/dto/cartDto';
import productsDto from '../../../../test-utils/dto/productsDto';
import renderWithStore from '../../../../test-utils/renderWithStore';
import RouterConnected from '../../../../test-utils/RouterConnected';
import Card from '../Card';

const preloadedWishlist = [0, 1];
const renderWithFakeUserStore = (wishlist, product, cart, cardShape) => {
  const preloadedState = {
    user: {
      user: {
        id: 6,
        role: USER_ROLE.CONSUMER,
        wishlist: wishlist,
      },
      updateWishlistStatus: REQUEST_STATUS.IDLE,
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
    <RouterConnected
      component={<Card product={product} cardShape={cardShape} />}
    />,
    { store: fakeUserStore }
  );
};

describe('Card component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot with default shape', () => {
      const { asFragment } = renderWithFakeUserStore(
        preloadedWishlist,
        productsDto[0],
        testCart
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with default shape with discount price', () => {
      const { asFragment } = renderWithFakeUserStore(
        preloadedWishlist,
        productsDto[5],
        testCart
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with list shape', () => {
      const { asFragment } = renderWithFakeUserStore(
        preloadedWishlist,
        productsDto[0],
        testCart,
        pageView.LIST_VIEW
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with list shape with discount price', () => {
      const { asFragment } = renderWithFakeUserStore(
        preloadedWishlist,
        productsDto[5],
        testCart,
        pageView.LIST_VIEW
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
