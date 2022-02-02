import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { pathNames } from '../../../constants/pathNames';
import { formatPrice } from '../../../helpers/formatData';
import { selectCart } from '../../../store/cart/cartSlice';
import Link from '../../ui-kit/Link/Link';

import styles from './CartFooter.module.scss';

export const CartFooter = () => {
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
      <Link
        style={{ width: 'unset' }}
        to={pathNames.CHECKOUT}
        isWhite
        isUppercase
      >
        <Button variant="contained" disabled={!totalPrice}>
          Buy now
        </Button>
      </Link>
    </div>
  );
};
