import React from 'react';

import { NavigationItem } from '../NavigationItem/NavigationItem';

import styles from './NavigationList.module.scss';

export const NavigationList = () => {
  return (
    <ul data-testid="header-navigation-list" className={styles.list}>
      <NavigationItem>HOME</NavigationItem>
      <NavigationItem>PRODUCTS</NavigationItem>
    </ul>
  );
};
