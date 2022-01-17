import React from 'react';

import productsDto from '../../../../test-utils/dto/productsDto';
import renderWithStore from '../../../../test-utils/renderWithStore';
import RouterConnected from '../../../../test-utils/RouterConnected';
import CardsContainer from '../CardsContainer';

describe('CardsContainer component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot with data', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected
          component={<CardsContainer products={productsDto.slice(0, 1)} />}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot without data', () => {
      const { asFragment } = renderWithStore(<CardsContainer products={[]} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
