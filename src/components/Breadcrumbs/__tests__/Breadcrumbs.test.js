import { render } from '@testing-library/react';
import React from 'react';

import RouterConnected from '../../../test-utils/RouterConnected';
import Breadcrumbs from '../Breadcrumbs';

const links = [
  { url: '/', text: 'Home' },
  { url: '/products', text: 'Products' },
];

describe('Breadcrumbs component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <RouterConnected component={<Breadcrumbs links={links} />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
