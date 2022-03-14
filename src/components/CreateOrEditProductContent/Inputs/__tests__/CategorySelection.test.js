import userEvent from '@testing-library/user-event';
import React from 'react';

import { defaultCategories } from '../../../../constants/defaultCategories';
import { categories } from '../../../../test-utils/dto/categoriesDto';
import renderWith, { screen } from '../../../../test-utils/renderWith';
import { SELECTION_ERROR } from '../../constants';
import CategorySelection from '../CategorySelection';

const preloadedState = {
  categories: {
    data: categories.map((el) => el.name),
  },
};

const rejectedRequestState = {
  categories: {
    errorOccurred: true,
  },
};

describe('Props tests', () => {
  it('should be able to change value', () => {
    const cb = jest.fn();
    const category = 'Grocery';

    renderWith(
      <CategorySelection onChange={cb} disableSubmit={() => {}} />,
      preloadedState
    );

    const input = screen.getByLabelText(/category/i);

    userEvent.click(input);
    userEvent.click(screen.getByText(category));

    expect(cb).toHaveBeenCalledWith(category);
  });

  it('should be able to call error callback', () => {
    const cb = jest.fn();

    renderWith(
      <CategorySelection onChange={() => {}} disableSubmit={cb} />,
      preloadedState
    );

    userEvent.click(screen.getByLabelText(/category/i));
    userEvent.click(screen.getByText('Grocery'));
    userEvent.click(screen.getByRole('button', { name: /category/i }));
    userEvent.click(screen.getByText('None'));

    expect(cb).toHaveBeenCalledTimes(1);
    expect(screen.getByText(SELECTION_ERROR)).toBeInTheDocument();
  });
});

describe('Error in category selection', () => {
  beforeEach(() =>
    renderWith(
      <CategorySelection onChange={() => {}} disableSubmit={() => {}} />,
      rejectedRequestState
    )
  );

  it('should display default categories', () => {
    userEvent.click(screen.getByLabelText(/category/i));

    expect(screen.getByText(defaultCategories[1])).toBeInTheDocument();
  });
});
