import { AppBar, Toolbar } from '@mui/material';
import React from 'react';

import logo from '../../../assets/images/logo_transparent.png';
import { useWindowSize } from '../../../hooks/useWindowSize';

import { BurgerButton } from './BurgerButton/BurgerButton';
import { NavigationList } from './NavigationList/NavigationList';
import { SignInArea } from './SignInArea/SignInArea';

import styles from './Header.module.scss';

export const laptopBreakPoint = 700;

export const Header = () => {
  const size = useWindowSize();

  return (
    <header className={styles.container}>
      <AppBar className={styles.appBar}>
        <Toolbar>
          {size.width > laptopBreakPoint ? (
            <></>
          ) : (
            <BurgerButton> </BurgerButton>
          )}
          <img src={logo} alt="logo" className={styles.logo} />
          {size.width < laptopBreakPoint ? (
            <></>
          ) : (
            <NavigationList> </NavigationList>
          )}
          <SignInArea></SignInArea>
        </Toolbar>
      </AppBar>
    </header>
  );
};
