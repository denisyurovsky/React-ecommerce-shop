import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Button } from '@mui/material';
import React from 'react';

import styles from './SignInArea.module.scss';

export const SignInArea = () => {
  return (
    <div className={styles.header}>
      <ShoppingBasketIcon className={styles.headerCart}></ShoppingBasketIcon>
      <Button variant="outlined" className={styles.button}>
        sign in
      </Button>
    </div>
  );
};
