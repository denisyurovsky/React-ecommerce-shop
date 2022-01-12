import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import FreeTextFilter from '../FreeTextFilter';

describe('Search component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const setSearchParams = jest.fn();
      const { asFragment } = render(
        <FreeTextFilter setSearchParams={setSearchParams} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('main group of tests', () => {
    it('typing in search works properly', () => {
      const setSearchParams = jest.fn();

      render(<FreeTextFilter setSearchParams={setSearchParams} />);
      const inputElement = screen.getByPlaceholderText(
        'Search by advertisement'
      );

      expect(inputElement).toBeInTheDocument();
      userEvent.type(inputElement, '');
      expect(inputElement).toHaveValue('');
      userEvent.type(inputElement, 'test');
      expect(inputElement).toHaveValue('test');
      userEvent.type(
        inputElement,
        '{backspace}{backspace}{backspace}{backspace}'
      );
      expect(inputElement).toHaveValue('');
    });
    it('search button works properly', () => {
      let data;
      const setSearchParams = jest.fn((func) => (data = func()));

      render(<FreeTextFilter setSearchParams={setSearchParams} />);
      const inputElement = screen.getByPlaceholderText(
        'Search by advertisement'
      );
      const button = screen.getByRole('button');

      userEvent.type(inputElement, 'test');
      userEvent.click(button);
      expect(data.text).toEqual('test');
    });
  });
});
