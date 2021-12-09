import { render } from '@testing-library/react';
import React from 'react';

import MobileNavigation from '../MobileNavigation';

describe('MobileNavigation component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<MobileNavigation />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
