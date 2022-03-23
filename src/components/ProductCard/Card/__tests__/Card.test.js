import React from 'react';

import { pageView } from '../../../../pages/ProductListPage/constants/constants';
import { testCart } from '../../../../test-utils/dto/cartDto';
import productsDto from '../../../../test-utils/dto/productsDto';
import usersDto from '../../../../test-utils/dto/usersDto';
import renderWith from '../../../../test-utils/renderWith';
import Card from '../Card';

describe('Card component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot with default shape', () => {
      const { asFragment } = renderWith(<Card product={productsDto[0]} />, {
        cart: testCart,
        user: usersDto[3],
      });

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with default shape with discount price', () => {
      const { asFragment } = renderWith(<Card product={productsDto[5]} />, {
        cart: testCart,
        user: usersDto[3],
      });

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with list shape', () => {
      const { asFragment } = renderWith(
        <Card product={productsDto[0]} cardShape={pageView.LIST_VIEW} />,
        { cart: testCart, user: usersDto[3] }
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with list shape with discount price', () => {
      const { asFragment } = renderWith(
        <Card product={productsDto[5]} cardShape={pageView.LIST_VIEW} />,
        { cart: testCart, user: usersDto[3] }
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
