import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { PRICE_ERROR, DISCOUNT_ERROR } from '../../../constants';
import PriceGroup from '../PriceGroup';

const initialValue = {
  original: '',
  discount: '',
};

describe('Props tests', () => {
  it('should be able to change value', () => {
    const cb = jest.fn();

    render(
      <PriceGroup value={initialValue} onChange={cb} disableSubmit={() => {}} />
    );

    const priceInput = screen.getByLabelText(/^price$/i);
    const discountInput = screen.getByLabelText(/^discount\sprice$/i);

    userEvent.type(priceInput, '5');
    userEvent.type(discountInput, '4');

    expect(cb).toHaveBeenCalledTimes(2);
  });

  describe('error tests', () => {
    const disableSubmit = jest.fn();
    const onChange = jest.fn();

    beforeEach(() => {
      render(
        <PriceGroup
          value={initialValue}
          onChange={onChange}
          disableSubmit={disableSubmit}
        />
      );
    });

    it('should call error cb when discount is more that price', () => {
      userEvent.type(screen.getByLabelText(/^discount\sprice$/i), '1');

      expect(disableSubmit).toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByText(DISCOUNT_ERROR)).toBeInTheDocument();
    });

    it('should be able to remove error and pass new values', () => {
      userEvent.type(screen.getByLabelText(/^discount\sprice$/i), '4');
      userEvent.type(screen.getByLabelText(/^price$/i), '5');

      expect(onChange).toHaveBeenCalled();
      expect(screen.queryByText(DISCOUNT_ERROR)).toBeNull();
    });

    it('should detect wrong symbols in price input', () => {
      userEvent.type(screen.getByLabelText(/^price$/i), 'f');

      expect(disableSubmit).toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByText(PRICE_ERROR)).toBeInTheDocument();
    });
  });
});
