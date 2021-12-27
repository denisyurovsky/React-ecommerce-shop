import { render } from '@testing-library/react';
import React from 'react';

import Breadcrumbs from '../Breadcrumbs';

const links = [
  { url: '/', text: 'Home' },
  { url: '/products', text: 'Products' },
];

describe('Breadcrumbs component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<Breadcrumbs links={links} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
