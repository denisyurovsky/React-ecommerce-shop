import React from 'react';

import renderWithStore from '../../../test-utils/renderWithStore';
import { HomePageContent } from '../HomePageContent';

describe('HomePageContent component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = renderWithStore(<HomePageContent />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
