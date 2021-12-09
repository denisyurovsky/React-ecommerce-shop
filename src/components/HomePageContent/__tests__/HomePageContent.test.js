import { render, screen } from '@testing-library/react';
import React from 'react';

import { HomePageContent } from '../HomePageContent';

describe('HomePageContent component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<HomePageContent />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
