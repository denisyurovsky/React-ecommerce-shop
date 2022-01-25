import React from 'react';

import renderWithStore from '../../../../../test-utils/renderWithStore';
import RouterConnected from '../../../../../test-utils/RouterConnected';
import { ShoppingCart } from '../ShoppingCart';

describe('ShoppingCart component', () => {
  describe('snapshots', () => {
    it('renders ShoppingCart snapshot', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<ShoppingCart />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
