import { render } from '@testing-library/react';
import React from 'react';

import { pageView } from '../../../../pages/ProductListPage/constants/constants';
import productsDto from '../../../../test-utils/dto/productsDto';
import RouterConnected from '../../../../test-utils/RouterConnected';
import Card from '../Card';

describe('Card component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot with default shape', () => {
      const { asFragment } = render(
        <RouterConnected component={<Card product={productsDto[0]} />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with list shape', () => {
      const { asFragment } = render(
        <RouterConnected
          component={
            <Card product={productsDto[0]} cardShape={pageView.LIST_VIEW} />
          }
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
