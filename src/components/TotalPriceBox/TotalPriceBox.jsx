import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { formatPrice } from '../../helpers/formatData';

import DiscountBox from './DiscountBox/DiscountBox';

import styles from './TotalPriceBox.module.scss';

const TotalPriceBox = ({ cart }) => {
  const { totalPrice, totalDiscountPrice, sellersDiscount, personalDiscount } =
    cart;

  const shouldDisplayDiscount =
    totalDiscountPrice !== totalPrice && totalDiscountPrice !== 0;

  if (!shouldDisplayDiscount) {
    <p data-testid="totalPrice" className={styles.totalPrice}>
      Total: {formatPrice(totalPrice)}
    </p>;
  }

  return (
    <Stack className={styles.priceBox}>
      <DiscountBox
        sellersDiscount={sellersDiscount}
        personalDiscount={personalDiscount}
      />
      <Stack
        direction="row"
        data-testid="totalPrice"
        className={styles.totalPrice}
      >
        <p>Total:&nbsp;</p>
        <p>{formatPrice(totalDiscountPrice)}</p>
      </Stack>
    </Stack>
  );
};

TotalPriceBox.propTypes = {
  cart: PropTypes.shape({
    totalPrice: PropTypes.number,
    totalDiscountPrice: PropTypes.number,
    sellersDiscount: PropTypes.number,
    personalDiscount: PropTypes.number,
  }),
};

export default TotalPriceBox;
