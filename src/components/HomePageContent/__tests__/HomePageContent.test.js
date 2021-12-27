import React from 'react';

import render from '../../../test-utils/renderWithStore';
import { HomePageContent } from '../HomePageContent';

describe('HomePageContent component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<HomePageContent />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
