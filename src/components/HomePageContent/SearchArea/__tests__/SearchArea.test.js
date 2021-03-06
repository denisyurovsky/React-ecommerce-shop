import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import renderWithStore, {
  screen,
} from '../../../../test-utils/renderWithStore';
import { SearchArea } from '../SearchArea';

const cards = [
  {
    name: '1 name',
    category: {
      name: 'First category',
    },
  },
  {
    name: '2 name',
    category: {
      name: 'Second category',
    },
  },
  {
    name: '3 name',
    category: {
      name: 'Third category',
    },
  },
];

describe('SearchArea component', () => {
  const categories = {
    data: ['First category', 'Second category', 'Third category'],
    isLoading: false,
    errorOccurred: false,
    errorMessage: '',
  };

  describe('snapshots', () => {
    it('renders a valid snapshot', async () => {
      renderWithStore(
        <SearchArea
          cards={cards}
          categories={categories}
          setDisplayedCards={jest.fn()}
        />
      );
      let inputElement = screen.getByDisplayValue('All categories');

      expect(inputElement).toBeInTheDocument();

      const buttons = screen.getAllByRole('button');

      fireEvent.mouseDown(buttons[0]);
      let valueOption = await screen.findByText('First category');

      fireEvent.click(valueOption);
      expect(inputElement).toHaveValue('First category');

      fireEvent.mouseDown(buttons[0]);
      valueOption = await screen.findByText('All categories');
      fireEvent.click(valueOption);
      expect(inputElement).toHaveValue('All categories');
    });
  });

  describe('main group of tests', () => {
    it('text search works properly', () => {
      renderWithStore(
        <SearchArea
          cards={cards}
          categories={categories}
          setDisplayedCards={jest.fn()}
        />
      );
      const inputElement = screen.getByPlaceholderText(
        'Search by advertisement'
      );

      expect(inputElement).toBeInTheDocument();
      userEvent.type(inputElement, 'test');
      expect(inputElement).toHaveValue('test');
      userEvent.type(
        inputElement,
        '{backspace}{backspace}{backspace}{backspace}'
      );
      expect(inputElement).toHaveValue('');
    });
  });
});
