import { render } from '@testing-library/react';
import React from 'react';

import { DiscountLabel } from '../DiscountLabel';

describe('DiscountLabel component', () => {
  describe('snapshots', () => {
    it('renders a snapshot with two prices', () => {
      const { asFragment } = render(
        <DiscountLabel price={100} discountPrice={10} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
