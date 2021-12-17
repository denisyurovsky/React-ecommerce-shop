import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { initialCards } from '../../HomePageContent';
import { SearchArea } from '../SearchArea';

describe('SearchArea component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', async () => {
      render(<SearchArea initialCards={initialCards} setCards={() => {}} />);

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
      render(<SearchArea initialCards={initialCards} setCards={() => {}} />);
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
  });
});
