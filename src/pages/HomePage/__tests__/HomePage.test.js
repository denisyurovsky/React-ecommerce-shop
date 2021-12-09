import { render } from '@testing-library/react';
import React from 'react';

import { HomePage } from '../HomePage';

describe('HomePage component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<HomePage />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
