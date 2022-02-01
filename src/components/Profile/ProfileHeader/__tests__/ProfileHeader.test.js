import { render, screen } from '@testing-library/react';
import React from 'react';

import RouterConnected from '../../../../test-utils/RouterConnected';
import ProfileHeader from '../ProfileHeader';

const profile = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
};

describe('ProfileHeader component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <RouterConnected component={<ProfileHeader profile={profile} />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should show header text', () => {
      render(
        <RouterConnected component={<ProfileHeader profile={profile} />} />
      );
      expect(screen.getByText(/Profile of John Smith/i)).toBeInTheDocument();
    });
  });
});
