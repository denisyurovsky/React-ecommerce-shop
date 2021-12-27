import React from 'react';

import render from '../../../../test-utils/renderWithStore';
import { CardsContainer } from '../CardsContainer';

describe('CardsContainer component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<CardsContainer displayedCards={[]} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
