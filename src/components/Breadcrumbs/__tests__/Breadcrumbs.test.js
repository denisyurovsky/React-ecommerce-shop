import { render } from '@testing-library/react';
import React from 'react';

import { pathNames } from '../../../helpers/constants/pathNames/pathNames';
import RouterConnected from '../../../test-utils/RouterConnected';
import Breadcrumbs from '../Breadcrumbs';

const links = [
  { url: '/', text: 'Home' },
  { url: pathNames.PRODUCTS, text: 'Products' },
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
