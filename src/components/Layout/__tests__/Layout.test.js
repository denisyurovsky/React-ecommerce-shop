import React from 'react';

import { BREAK_POINT } from '../../../helpers/constants/constants';
import render, { screen } from '../../../test-utils/renderWith';
import { Layout } from '../Layout';

localStorage.setItem('accessToken', 'eyJhbGciOiJIU');

describe('Layout component', () => {
  it('should show profile', () => {
    window.innerWidth = BREAK_POINT.LAPTOP;
    render(<Layout />, {}, '/profile', ['/profile']);

    expect(screen.queryByText('Wishlist')).toBeInTheDocument();
  });

  it('should not show profile menu before breakpoint', () => {
    window.innerWidth = BREAK_POINT.LAPTOP + 10;
    render(<Layout />, {}, '/profile', ['/profile']);

    expect(screen.queryByText('wishlist')).not.toBeInTheDocument();
  });

  it('should show profile menu only on profile pages', () => {
    window.innerWidth = BREAK_POINT.LAPTOP - 10;
    render(<Layout />, {}, '/', ['/']);

    expect(screen.queryByText('profile')).not.toBeInTheDocument();
  });

  it('should not show profile menu if user is not logged', () => {
    window.innerWidth = BREAK_POINT.LAPTOP;
    localStorage.clear();
    render(<Layout />, {}, '/profile', ['/profile']);

    expect(screen.queryByText('orders')).not.toBeInTheDocument();
  });
});
