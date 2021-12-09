import { render } from '@testing-library/react';
import React from 'react';

import { NavigationItem } from '../NavigationItem';

describe('NavigationItem component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <NavigationItem>
          Text in block test
          <div>Div test</div>
          <p>Paragraph test</p>
          <span>Span test</span>
        </NavigationItem>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
