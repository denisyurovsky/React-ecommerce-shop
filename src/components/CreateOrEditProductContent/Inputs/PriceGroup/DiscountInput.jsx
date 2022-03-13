import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { DISCOUNT_ERROR, PRICE_ERROR } from '../../constants';

const DiscountInput = ({ discount, price, onChange, isError }) => {
  const checkBelowPrice = (discount) => Number(discount) < Number(price);

  let errorText = null;

  if (isError && checkBelowPrice(discount)) {
    errorText = PRICE_ERROR;
  } else if (isError) {
    errorText = DISCOUNT_ERROR;
  }

  const formatedDiscount = discount === '0' ? '' : discount;

  return (
    <TextField
      label="Discount price"
      value={formatedDiscount}
      onChange={onChange}
      error={isError}
      helperText={isError ? errorText : null}
      fullWidth
    />
  );
};

DiscountInput.defaultProps = {
  discount: '',
  price: '',
};

DiscountInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  discount: PropTypes.string,
  price: PropTypes.string,
};

export default DiscountInput;
