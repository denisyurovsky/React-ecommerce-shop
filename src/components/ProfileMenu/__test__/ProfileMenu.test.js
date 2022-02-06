import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import renderWith from '../../../test-utils/renderWith';
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

  describe('ProfileMenu Logout', () => {
    it('should clean localStorage', async () => {
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJvcm4yZGllLmNvbSIsImlhdCI6MTY0MzcxOTM2NiwiZXhwIjoxNjQzNzIyOTY2LCJzdWIiOiIxIn0.AsOF1x9vVcLklRmsnmUmDdn-KoajVJD2X1xVWgYVKlc';

      localStorage.setItem('accessToken', accessToken);

      renderWith(<ProfileMenu />);
      const button = screen.getByTestId('btn-profile');

      userEvent.click(button);
      expect(screen.getByTestId('menuList')).toBeInTheDocument();
      delete window.location;
      window.location = { reload: jest.fn() };
      fireEvent.click(screen.getByText('Log out'));
      expect(screen.queryByTestId('menuList')).toBeNull();
      expect(localStorage.accessToken).toBeUndefined();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
