import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { sortTypes } from '../../../../pages/ProductListPage/constants/constants';
import SortFilter from '../SortFilter';

describe('SortFilter component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const setFilterProperties = jest.fn();
      const { asFragment } = render(
        <SortFilter setFilterProperties={setFilterProperties} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('main group of tests', () => {
    it('SortFilter works properly', async () => {
      let data;
      const setFilterProperties = jest.fn((func) => (data = func()));

      render(<SortFilter setFilterProperties={setFilterProperties} />);

      const select = screen.getByRole('combobox');

      expect(
        screen.getByRole('option', { name: 'From new to old' }).selected
      ).toBe(true);
      userEvent.selectOptions(select, sortTypes.CHEAP_FIRST);
      expect(
        screen.getByRole('option', { name: 'From cheap to expensive' }).selected
      ).toBe(true);
      expect(data.sort).toEqual(sortTypes.CHEAP_FIRST);
    });
  });
});
