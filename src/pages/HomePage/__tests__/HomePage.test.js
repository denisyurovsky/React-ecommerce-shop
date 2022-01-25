import React from 'react';

import renderWithStore from '../../../test-utils/renderWithStore';
import { HomePage } from '../HomePage';

describe('HomePage component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = renderWithStore(<HomePage />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
