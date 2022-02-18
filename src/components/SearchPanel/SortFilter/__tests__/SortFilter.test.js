import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {
  sortTypes,
  sortObj,
} from '../../../../pages/ProductListPage/constants/constants';
import SortFilter from '../SortFilter';

describe('SortFilter component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const setSearchParams = jest.fn();
      const { asFragment } = render(
        <SortFilter
          fullWidth
          selectedSortType={{ field: 'createdAt', order: 'desc' }}
          setSearchParams={setSearchParams}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('main group of tests', () => {
    it('SortFilter works properly', async () => {
      let data;
      const setSearchParams = jest.fn((func) => (data = func()));

      render(
        <SortFilter
          fullWidth
          selectedSortType={{ field: 'createdAt', order: 'desc' }}
          setSearchParams={setSearchParams}
        />
      );

      const select = screen.getByRole('combobox');

      expect(
        screen.getByRole('option', { name: 'From new to old' }).selected
      ).toBe(true);
      userEvent.selectOptions(select, sortTypes.CHEAP_FIRST);
      expect(
        screen.getByRole('option', { name: 'From cheap to expensive' }).selected
      ).toBe(true);
      expect(data.sort).toEqual(sortObj[sortTypes.CHEAP_FIRST]);
    });
  });
});
