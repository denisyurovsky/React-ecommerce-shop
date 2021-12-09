import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import categoriesDto from '../../../../test-utils/dto/categoriesDto';
import CategoryFilter from '../CategoryFilter';

describe('CategoryFilter component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const setFilterProperties = jest.fn();
      const { asFragment } = render(
        <CategoryFilter
          allCategories={categoriesDto}
          setFilterProperties={setFilterProperties}
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
      const setFilterProperties = jest.fn((func) => (data = func()));

      render(
        <CategoryFilter
          allCategories={categoriesDto}
          setFilterProperties={setFilterProperties}
          isLoading={false}
          errorOccurred={false}
        />
      );

      const button = screen.getByRole('button', { haspopup: 'listbox' });

      userEvent.click(button);
      const option = screen.getByRole('option', { name: /computers/i });

      userEvent.click(option);
      expect(data.category).toEqual('Computers');
    });
  });
});
