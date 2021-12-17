import { render } from '@testing-library/react';
import React from 'react';

import { NavigationList } from '../NavigationList';

describe('NavigationList component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<NavigationList />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
