import { render } from '@testing-library/react';
import React from 'react';

import { ProductPrice } from '../ProductPrice';

describe('ProductPrice component', () => {
  describe('snapshots', () => {
    it('renders a snapshot with two prices', () => {
      const { asFragment } = render(
        <ProductPrice price={100} discountPrice={10} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
