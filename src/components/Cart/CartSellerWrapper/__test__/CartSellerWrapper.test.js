import React from 'react';

import { testCart } from '../../../../test-utils/dto/cartDto';
import renderWith from '../../../../test-utils/renderWith';
import { CartSellerWrapper } from '../CartSellerWrapper';

const initialUser = {
  user: { id: 1 },
};

const preloadedState = {
  cart: testCart,
  user: initialUser,
};

describe('CartSellerWrapper component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = renderWith(
        <CartSellerWrapper
          userId={1}
          products={testCart.sellers[1].products}
          openModal={() => {}}
          setModalProduct={() => {}}
        />,
        preloadedState
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
