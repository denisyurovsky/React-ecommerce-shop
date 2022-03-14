import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

import checkForOnlyNumbers from '../../../helpers/checkForOnlyNumbers';
import { DISCOUNT_ERROR, EMPTY_ERROR } from '../constants';

const priceToString = (price) => String(price ?? '');

const PriceGroup = ({ value, onChange, disableSubmit }) => {
  const priceStr = priceToString(value.original);
  const discountStr = priceToString(value.discount);

  const [price, setPrice] = useState(priceStr);
  const [discount, setDiscount] = useState(discountStr);
  const [isPriceError, setIsPriceError] = useState(false);
  const [isDiscountError, setIsDiscountError] = useState(false);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;

      return;
    }

    const formatedPrice = formatPrice(price, discount);

    if (isDiscountError || isPriceError || price === '') {
      disableSubmit();
    } else {
      onChange(formatedPrice);
    }
    //eslint-disable-next-line
  }, [price, discount]);

  const formatPrice = (price, discountPrice) => {
    const original = Number(price);
    const discount = discountPrice === '' ? null : Number(discountPrice);

    return { original, discount };
  };

  const checkBelowPrice = (price, discount) => Number(price) > Number(discount);
  const checkDiscountError = (price, discount) =>
    price !== '' && !checkBelowPrice(price, discount);

  const handleDiscount = (e) => {
    const newDiscount = e.target.value;

    if (!checkForOnlyNumbers(newDiscount)) {
      return;
    }

    setDiscount(newDiscount);
    setIsDiscountError(checkDiscountError(price, newDiscount));
  };

  const handlePrice = (e) => {
    const newPrice = e.target.value;

    if (!checkForOnlyNumbers(newPrice)) {
      return;
    }

    setPrice(newPrice);
    setIsPriceError(!newPrice.length);
    setIsDiscountError(checkDiscountError(newPrice, discount));
  };

  return (
    <>
      <TextField
        label="Price"
        value={price}
        onChange={handlePrice}
        error={isPriceError}
        helperText={isPriceError ? EMPTY_ERROR : null}
        fullWidth
      />
      <TextField
        label="Discount price"
        value={discount}
        onChange={handleDiscount}
        error={isDiscountError}
        helperText={isDiscountError ? DISCOUNT_ERROR : null}
        fullWidth
      />
    </>
  );
};

PriceGroup.propTypes = {
  value: PropTypes.objectOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
  disableSubmit: PropTypes.func.isRequired,
};

export default PriceGroup;
