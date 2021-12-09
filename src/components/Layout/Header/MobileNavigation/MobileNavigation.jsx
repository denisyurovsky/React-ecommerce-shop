import React, { forwardRef } from 'react';

import { NavigationItem } from '../NavigationItem/NavigationItem';

import styles from './MobileNavigation.module.scss';

const MobileNavigation = forwardRef((props, ref) => {
  return (
    <ul
      data-testid="header-mobile-navigation"
      ref={ref}
      className={styles.container}
    >
      <NavigationItem>HOME</NavigationItem>
      <NavigationItem>PRODUCTS</NavigationItem>
    </ul>
  );
});

MobileNavigation.displayName = 'MobileNavigation';

export default MobileNavigation;
