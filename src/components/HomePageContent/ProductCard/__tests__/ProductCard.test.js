import { render } from '@testing-library/react';
import React from 'react';

import { ProductCard } from '../ProductCard';

const testCard = {
  name: 'name',
  createdAt: '2021-12-17T08:51:50.417Z',
  updatedAt: '2021-12-17T08:51:50.417Z',
  price: 11,
  category: { name: 'typeName' },
};

describe('ProductCard component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<ProductCard card={testCard} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
