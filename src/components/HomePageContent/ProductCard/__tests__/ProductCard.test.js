import { render } from '@testing-library/react';
import React from 'react';

import { initialCards } from '../../HomePageContent.jsx';
import { ProductCard } from '../ProductCard';

describe('ProductCard component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<ProductCard card={initialCards[0]} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
