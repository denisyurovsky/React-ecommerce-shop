import { render } from '@testing-library/react';
import React from 'react';

import { CardsContainer } from '../CardsContainer';

describe('CardsContainer component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<CardsContainer cards={[]} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
