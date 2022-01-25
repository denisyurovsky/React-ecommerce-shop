import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectCart } from '../../../../store/cart/cartSlice';

import styles from './ShoppingCart.module.scss';

export const ShoppingCart = () => {
  const cart = useSelector(selectCart);

  return (
    <div className={styles.container}>
      <Link to={'/cart'} className={styles.ref} />
      <ShoppingBasketIcon className={styles.cart} />
      {cart.totalQuantity !== 0 && (
        <p className={styles.counter}>{cart.totalQuantity}</p>
      )}
    </div>
  );
};
