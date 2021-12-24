import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import logo from '../../../assets/images/logo_transparent.png';
import { useWindowSize } from '../../../hooks/useWindowSize';
import Authentification from '../../Authentification/Authentification';

import { BurgerButton } from './BurgerButton/BurgerButton';
import { NavigationList } from './NavigationList/NavigationList';

import styles from './Header.module.scss';

export const laptopBreakPoint = 700;

export const Header = () => {
  const size = useWindowSize();

  return (
    <AppBar className={styles.appBar}>
      <Toolbar className={styles.toolBar}>
        {size.width <= laptopBreakPoint && <BurgerButton />}
        <img src={logo} alt="logo" className={styles.logo} />
        {size.width > laptopBreakPoint && <NavigationList />}
        <Box className={styles.header}>
          <ShoppingBasketIcon sx={{ mr: 2 }}></ShoppingBasketIcon>
          <Authentification />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
