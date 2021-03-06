import React from 'react';

import { testCart } from '../../../../test-utils/dto/cartDto';
import renderWith from '../../../../test-utils/renderWith';
import { CartProductCards } from '../CartProductCards';

const initialUser = {
  user: { id: 1 },
};

const preloadedState = {
  cart: testCart,
  user: initialUser,
};

describe('CartProductCards component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = renderWith(
        <CartProductCards openModal={() => {}} setModalProduct={() => {}} />,
        preloadedState
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
