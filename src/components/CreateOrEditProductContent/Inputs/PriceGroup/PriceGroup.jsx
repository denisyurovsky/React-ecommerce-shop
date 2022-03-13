import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

import checkForOnlyNumbers from '../../../../helpers/checkForOnlyNumbers';
import { PRICE_ERROR } from '../../constants';

import DiscountInput from './DiscountInput';

const PriceGroup = ({ value, onChange, disableSubmit }) => {
  const [price, setPrice] = useState(value.original);
  const [discount, setDiscount] = useState(value.discount);
  const [isPriceError, setIsPriceError] = useState(false);
  const [isDiscountError, setIsDiscountError] = useState(false);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;

      return;
    }

    if (isDiscountError || isPriceError || price === '') {
      disableSubmit();
    } else {
      onChange({ original: price, discount });
    }
    //eslint-disable-next-line
  }, [price, discount]);

  const checkBelowPrice = (price, discount) => Number(price) > Number(discount);

  const checkDiscountValidity = (discount) =>
    checkBelowPrice(price, discount) && checkForOnlyNumbers(discount);

  const handleDiscountChange = (ev) => {
    const newDiscount = ev.target.value;

    setDiscount(newDiscount);
    setIsDiscountError(!checkDiscountValidity(newDiscount));
  };

  const handlePriceChange = (ev) => {
    const newPrice = ev.target.value;

    setPrice(newPrice);
    setIsPriceError(!checkForOnlyNumbers(newPrice));
    setIsDiscountError(!checkBelowPrice(newPrice, discount));
  };

  return (
    <>
      <TextField
        label="Price"
        value={price}
        onChange={handlePriceChange}
        error={isPriceError}
        helperText={isPriceError ? PRICE_ERROR : null}
        fullWidth
      />
      <DiscountInput
        discount={discount}
        price={price}
        onChange={handleDiscountChange}
        disableSubmit={disableSubmit}
        isError={isDiscountError}
      />
    </>
  );
};

PriceGroup.propTypes = {
  value: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  disableSubmit: PropTypes.func.isRequired,
};

export default PriceGroup;
