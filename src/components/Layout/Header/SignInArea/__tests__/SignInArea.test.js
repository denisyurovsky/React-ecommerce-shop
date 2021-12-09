import { render } from '@testing-library/react';
import React from 'react';

import { SignInArea } from '../SignInArea';

describe('SignInArea component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<SignInArea />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
