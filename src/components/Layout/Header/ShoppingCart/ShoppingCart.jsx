import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import React from 'react';
import { useSelector } from 'react-redux';

import { pathNames } from '../../../../constants/pathNames';
import { selectCart } from '../../../../store/cart/cartSlice';
import Link from '../../../ui-kit/Link/Link';

import styles from './ShoppingCart.module.scss';

export const ShoppingCart = () => {
  const cart = useSelector(selectCart);

  return (
    <div className={styles.container}>
      <Link to={pathNames.CART} isWhite isCentered>
        <ShoppingBasketIcon className={styles.cart} />
        {cart.totalQuantity !== 0 && (
          <p className={styles.counter}>{cart.totalQuantity}</p>
        )}
      </Link>
    </div>
  );
};
