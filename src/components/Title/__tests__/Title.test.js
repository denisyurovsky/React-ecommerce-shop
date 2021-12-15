import { render } from '@testing-library/react';
import React from 'react';

import { Title } from '../Title';

describe('Title component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<Title>Title text</Title>);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
