import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../../assets/images/logo_transparent.png';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { getCart } from '../../../store/cart/cartSlice';
import { getCurrentUser } from '../../../store/user/userSlice';
import Authentification from '../../Authentification/Authentification';

import { BurgerButton } from './BurgerButton/BurgerButton';
import { NavigationList } from './NavigationList/NavigationList';
import { ShoppingCart } from './ShoppingCart/ShoppingCart';

import styles from './Header.module.scss';

export const laptopBreakPoint = 700;

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch, user.user.id]);

  const size = useWindowSize();

  return (
    <AppBar className={styles.appBar}>
      <Toolbar className={styles.toolBar}>
        {size.width <= laptopBreakPoint && <BurgerButton />}
        <img src={logo} alt="logo" className={styles.logo} />
        {size.width > laptopBreakPoint && <NavigationList />}
        <Box className={styles.header}>
          <ShoppingCart></ShoppingCart>
          <Authentification />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
