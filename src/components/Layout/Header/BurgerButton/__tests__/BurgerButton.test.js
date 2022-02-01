import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import RouterConnected from '../../../../../test-utils/RouterConnected';
import { BurgerButton } from '../BurgerButton';

describe('BurgerButton component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <RouterConnected component={<BurgerButton />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('correct onClick behaviour', () => {
    it('check if burger button behaves correctly', () => {
      render(<RouterConnected component={<BurgerButton />} />);
      fireEvent.click(screen.getByTestId('burger-button'));
      expect(screen.getByTestId('header-mobile-navigation')).toHaveClass(
        'displayed'
      );
      expect(screen.getByTestId('burger-button')).toHaveClass('opened');
    });
  });
});
