import { render, screen } from '@testing-library/react';
import React from 'react';

import { App } from '../App';

describe('App component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(<App />);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('another group of tests', () => {
    beforeEach(() => {
      render(<App />);
    });

    it('renders title "Hi team"', () => {
      const title = screen.getByTestId('title');

      expect(title.textContent).toContain('Hi team');
    });

    it('renders "reactjs.org" as a link to the course', () => {
      const courseLink = screen.getByText(/learn react/i);

      expect(courseLink.getAttribute('href')).toBe('https://reactjs.org');
    });
  });
});
