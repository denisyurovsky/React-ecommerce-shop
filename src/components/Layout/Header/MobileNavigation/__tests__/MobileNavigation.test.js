import React from 'react';

import render from '../../../../../test-utils/renderWithStore';
import RouterConnected from '../../../../../test-utils/RouterConnected';
import MobileNavigation from '../MobileNavigation';

describe('MobileNavigation component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const items = [
        {
          name: 'HOME',
          link: '/',
        },
        {
          name: 'PRODUCTS',
          link: '/products',
        },
      ];
      const { asFragment } = render(
        <RouterConnected component={<MobileNavigation items={items} />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
