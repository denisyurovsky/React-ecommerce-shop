import React from 'react';

import render from '../../../../test-utils/renderWithStore';
import { CartHeader } from '../CartHeader';

describe('CartHeader component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<CartHeader openModal={() => {}} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
