import { render } from '@testing-library/react';
import React from 'react';

import RouterConnected from '../../../../../test-utils/RouterConnected';
import { NavigationList } from '../NavigationList';

describe('NavigationList component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <RouterConnected component={<NavigationList />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
