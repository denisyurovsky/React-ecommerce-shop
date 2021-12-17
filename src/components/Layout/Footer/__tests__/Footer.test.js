import { render } from '@testing-library/react';
import React from 'react';

import { Footer } from '../Footer';
jest.useFakeTimers('modern');

describe('Footer component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot when year 2025', () => {
      jest.setSystemTime(new Date(2025, 1, 1));

      const { asFragment } = render(<Footer />);

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders a valid snapshot when year 2021', () => {
      jest.setSystemTime(new Date(2021, 1, 1));

      const { asFragment } = render(<Footer />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
