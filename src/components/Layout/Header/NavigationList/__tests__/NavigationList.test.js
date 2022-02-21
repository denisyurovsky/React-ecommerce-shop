import React from 'react';

import renderWith from '../../../../../test-utils/renderWith';
import { NavigationList } from '../NavigationList';

describe('NavigationList component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = renderWith(<NavigationList />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
