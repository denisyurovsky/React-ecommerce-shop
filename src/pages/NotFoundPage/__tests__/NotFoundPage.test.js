import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { NotFoundPage } from '../NotFoundPage';

describe('NotFoundPage component', () => {
  beforeEach(() => {
    render(<NotFoundPage />, { wrapper: MemoryRouter });
  });

  it('renders a valid snapshot', () => {
    const { asFragment } = render(<NotFoundPage />, {
      wrapper: MemoryRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders "Go to home page" as a link to app home page', () => {
    const courseLink = screen.getByText(/home page/i);

    expect(courseLink.getAttribute('href')).toBe('/');
  });
});
