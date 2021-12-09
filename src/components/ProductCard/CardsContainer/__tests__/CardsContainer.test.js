import { render } from '@testing-library/react';
import React from 'react';

import productsDto from '../../../../test-utils/dto/productsDto';
import CardsContainer from '../CardsContainer';

describe('CardsContainer component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot with data', () => {
      const { asFragment } = render(<CardsContainer products={productsDto} />);

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot without data', () => {
      const { asFragment } = render(<CardsContainer products={[]} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});