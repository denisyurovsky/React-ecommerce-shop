import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import renderWithStore from '../../../test-utils/renderWithStore';
import RouterConnected from '../../../test-utils/RouterConnected';
import { ProfileMenu } from '../ProfileMenu';

describe('Profile menu component', () => {
  describe('snapshots', () => {
    it('renders profile menu in the default/closed state', () => {
      const { asFragment } = renderWithStore(<ProfileMenu />);

      expect(asFragment()).toMatchSnapshot();
    });
    it('renders profile menu in the opened state', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<ProfileMenu />} />
      );
      const button = screen.getByTestId('btn-profile');

      userEvent.click(button);

      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('ProfileMenu opens onClick', () => {
    it('opens when click on it and closes when clicks escape', async () => {
      renderWithStore(
        <BrowserRouter>
          <ProfileMenu />
        </BrowserRouter>
      );
      const button = screen.getByTestId('btn-profile');

      userEvent.click(button);
      expect(screen.getByTestId('menuList')).toBeInTheDocument();
      fireEvent.click(screen.getByText('My Wishlist'));
      expect(screen.queryByTestId('menuList')).toBe(null);
      userEvent.click(button);
      expect(screen.getByTestId('menuList')).toBeInTheDocument();

      fireEvent.keyDown(screen.getByTestId('menuList'), {
        key: 'Escape',
        code: 'Escape',
      });

      expect(screen.queryByTestId('menuList')).toBe(null);
    });
  });
});
