import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { formatPrice } from '../../../helpers/utils/formatData';
import { selectCart } from '../../../store/cart/cartSlice';

import styles from './CartFooter.module.scss';

export const CartFooter = ({ buyHandler }) => {
  const cart = useSelector(selectCart);

  return (
    <div className={styles.footer}>
      <p data-testid="totalPrice" className={styles.totalPrice}>
        Total Price: {formatPrice(cart.totalPrice)}
      </p>
      <Button variant="contained" onClick={buyHandler}>
        Buy now
      </Button>
    </div>
  );
};

CartFooter.propTypes = {
  buyHandler: PropTypes.func,
};
