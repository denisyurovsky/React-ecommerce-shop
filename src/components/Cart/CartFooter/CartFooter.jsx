import Button from '@mui/material/Button';
import React from 'react';
import { useSelector } from 'react-redux';

import { pathNames } from '../../../constants/pathNames';
import { selectCart } from '../../../store/cart/cartSlice';
import TotalPriceBox from '../../TotalPriceBox/TotalPriceBox';
import Link from '../../ui-kit/Link/Link';

import styles from './CartFooter.module.scss';

export const CartFooter = () => {
  const cart = useSelector(selectCart);

  return (
    <div className={styles.footer}>
      <TotalPriceBox cart={cart} />
      <Link
        style={{ width: 'unset', mb: '13px' }}
        to={pathNames.CHECKOUT}
        isWhite
        isUppercase
      >
        <Button variant="contained" disabled={!cart.totalPrice}>
          Buy now
        </Button>
      </Link>
    </div>
  );
};
