import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { formatPrice } from '../../../helpers/utils/formatData';
import { selectCart } from '../../../store/cart/cartSlice';

import styles from './CartFooter.module.scss';

export const CartFooter = ({ buyHandler }) => {
  const cart = useSelector(selectCart);

  const { totalDiscountPrice, totalPrice } = cart;

  const [shouldDisplayDiscount, setShouldDisplayDiscount] = useState(
    totalDiscountPrice !== totalPrice && totalDiscountPrice !== 0
  );

  useEffect(() => {
    setShouldDisplayDiscount(
      totalDiscountPrice !== totalPrice && totalDiscountPrice !== 0
    );
  }, [totalDiscountPrice, totalPrice]);

  return (
    <div className={styles.footer}>
      {shouldDisplayDiscount ? (
        <Box>
          <p data-testid="totalPrice" className={styles.totalPrice}>
            Total Price: {formatPrice(totalDiscountPrice)}
          </p>
          <p data-testid="savedMoney" className={styles.savedMoney}>
            You saved: {formatPrice(totalPrice - totalDiscountPrice)}
          </p>
        </Box>
      ) : (
        <p data-testid="totalPrice" className={styles.totalPrice}>
          Total Price: {formatPrice(totalPrice)}
        </p>
      )}
      <Button variant="contained" onClick={buyHandler}>
        Buy now
      </Button>
    </div>
  );
};

CartFooter.propTypes = {
  buyHandler: PropTypes.func,
};
