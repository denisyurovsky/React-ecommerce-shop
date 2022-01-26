import React from 'react';

import { pageView } from '../../../../pages/ProductListPage/constants/constants';
import productsDto from '../../../../test-utils/dto/productsDto';
import renderWithStore from '../../../../test-utils/renderWithStore';
import RouterConnected from '../../../../test-utils/RouterConnected';
import Card from '../Card';

describe('Card component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot with default shape', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<Card product={productsDto[0]} />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with default shape with discount price', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<Card product={productsDto[5]} />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with list shape', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected
          component={
            <Card product={productsDto[0]} cardShape={pageView.LIST_VIEW} />
          }
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot with list shape with discount price', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected
          component={
            <Card
              product={{ ...productsDto[0], discountPrice: 100 }}
              cardShape={pageView.LIST_VIEW}
            />
          }
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
