import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { EMPTY_ERROR, DISCOUNT_ERROR } from '../../constants';
import PriceGroup from '../PriceGroup';

const initialValue = {
  original: null,
  discount: null,
};

describe('Props tests', () => {
  const onChange = jest.fn();

  beforeEach(() =>
    render(
      <PriceGroup
        value={initialValue}
        onChange={onChange}
        disableSubmit={() => {}}
      />
    )
  );

  it('should be able to change value', () => {
    userEvent.type(screen.getByLabelText(/^price$/i), '5');
    userEvent.type(screen.getByLabelText('Discount price'), '4');

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('should ignore incorrect values', () => {
    userEvent.type(screen.getByLabelText(/^price$/i), 'f');
    userEvent.type(screen.getByLabelText('Discount price'), 'a');

    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('error tests', () => {
  const disableSubmit = jest.fn();
  const onChange = jest.fn();

  beforeEach(() =>
    render(
      <PriceGroup
        value={initialValue}
        onChange={onChange}
        disableSubmit={disableSubmit}
      />
    )
  );

  it('should call error cb when discount is more that price', () => {
    userEvent.type(screen.getByLabelText('Discount price'), '1');
    userEvent.type(screen.getByLabelText(/^price$/i), '1');

    expect(disableSubmit).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByText(DISCOUNT_ERROR)).toBeInTheDocument();
  });

  it('should be able to remove error and pass new values', () => {
    userEvent.type(screen.getByLabelText('Discount price'), '4');
    userEvent.type(screen.getByLabelText(/^price$/i), '5');

    expect(onChange).toHaveBeenCalled();
    expect(screen.queryByText(DISCOUNT_ERROR)).toBeNull();
  });

  it('should show empty price input error with priority', () => {
    userEvent.type(screen.getByLabelText(/^price$/i), '1{backspace}');
    userEvent.type(screen.getByLabelText('Discount price'), '4');

    expect(screen.getByText(EMPTY_ERROR)).toBeInTheDocument();
    expect(screen.queryByText(DISCOUNT_ERROR)).toBeNull();
  });

  it('should not show discount error if price is empty', () => {
    userEvent.type(screen.getByLabelText('Discount price'), '4');

    expect(screen.queryByText(DISCOUNT_ERROR)).toBeNull();
  });
});
