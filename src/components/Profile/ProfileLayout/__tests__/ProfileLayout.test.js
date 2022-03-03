import React from 'react';

import { BREAK_POINT } from '../../../../constants/constants';
import users from '../../../../test-utils/dto/usersDto';
import render, { screen } from '../../../../test-utils/renderWith';
import ProfileLayout from '../ProfileLayout';

localStorage.setItem('accessToken', 'eyJhbGciOiJIU');

const MyProfileLayout = () => (
  <ProfileLayout profile={users[1].user}>
    <div>Children test</div>
  </ProfileLayout>
);

describe('ProfileLayout component', () => {
  describe('profile sidebar', () => {
    it('should be displayed if width more breakpoint', () => {
      window.innerWidth = BREAK_POINT.LAPTOP + 10;
      const { asFragment } = render(<MyProfileLayout />);

      expect(asFragment()).toMatchSnapshot();
      expect(screen.getByText('My Wishlist')).toBeInTheDocument();
      expect(screen.getByText('Children test')).toBeInTheDocument();
    });

    it('should not be displayed if width equal breakpoint', () => {
      window.innerWidth = BREAK_POINT.LAPTOP;
      render(<MyProfileLayout />);

      expect(screen.queryByText('My profile')).not.toBeInTheDocument();
    });

    it('should not be displayed if width less breakpoint', () => {
      window.innerWidth = BREAK_POINT.LAPTOP - 10;
      render(<MyProfileLayout />);

      expect(screen.queryByText('My profile')).not.toBeInTheDocument();
      expect(screen.getByText('Children test')).toBeInTheDocument();
    });
  });
});
