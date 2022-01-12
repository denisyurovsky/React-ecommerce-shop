import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import categoriesDto from '../../../../test-utils/dto/categoriesDto';
import CategoryFilter from '../CategoryFilter';

describe('CategoryFilter component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const setSearchParams = jest.fn();
      const { asFragment } = render(
        <CategoryFilter
          allCategories={categoriesDto}
          setSearchParams={setSearchParams}
          isLoading={false}
          errorOccurred={false}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('main group of tests', () => {
    it('CategoryFilter works properly', async () => {
      let data;
      const setSearchParams = jest.fn((func) => (data = func()));

      render(
        <CategoryFilter
          allCategories={categoriesDto}
          setSearchParams={setSearchParams}
          isLoading={false}
          errorOccurred={false}
        />
      );

      const button = screen.getByRole('button', { haspopup: 'listbox' });

      userEvent.click(button);
      const option1 = screen.getByRole('option', { name: /computers/i });

      userEvent.click(option1);
      expect(data.filters).toEqual([{ 'category.name': 'Computers' }]);

      userEvent.click(button);
      const option2 = screen.getByRole('option', { name: /all categories/i });

      userEvent.click(option2);
      expect(data.filters).toEqual(null);
    });
  });
});
