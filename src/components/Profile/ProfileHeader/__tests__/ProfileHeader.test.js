import { render, screen } from '@testing-library/react';
import React from 'react';

import ProfileHeader from '../ProfileHeader';

const profile = {
  id: 1,
  firstName: 'John',
  lastName: 'Smith',
};

describe('ProfileHeader component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<ProfileHeader profile={profile} />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should show header text', () => {
      render(<ProfileHeader profile={profile} />);
      expect(screen.getByText(/Profile of John Smith/i)).toBeInTheDocument();
    });
  });
});
