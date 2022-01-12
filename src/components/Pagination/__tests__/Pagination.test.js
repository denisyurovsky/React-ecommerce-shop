import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Pagination from '../Pagination';

describe('Pagination component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const setSearchParams = jest.fn();
      const { asFragment } = render(
        <Pagination
          setSearchParams={setSearchParams}
          currentPage={2}
          pageCount={8}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('main group of tests', () => {
    it('Pagination buttons works properly', () => {
      let data;
      const setSearchParams = jest.fn((func) => (data = func()));

      render(
        <Pagination
          setSearchParams={setSearchParams}
          currentPage={1}
          pageCount={6}
        />
      );

      const button = screen.getByRole('button', { name: /4/ });

      userEvent.click(button);
      expect(data.currentPage).toEqual(4);
    });
  });
});
