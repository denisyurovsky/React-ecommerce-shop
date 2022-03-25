import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import { pathNames } from '../../../../constants/pathNames';
import { getUserRole } from '../../../../store/user/userSlice';
import { Role } from '../../../../ts/enums/enums';
import { NavigationItem } from '../NavigationItem/NavigationItem';

import styles from './MobileNavigation.module.scss';

const MobileNavigation = forwardRef(({ closeBurger }, ref) => {
  const userRole = useSelector(getUserRole);

  const navItems = [
    { title: 'HOME', path: '/' },
    { title: 'PRODUCTS', path: pathNames.PRODUCTS },
  ];

  if (userRole === Role.Admin || userRole === Role.Seller) {
    navItems.push({ title: 'ADMIN', path: pathNames.ADMIN });
  }

  return (
    <ul
      data-testid="header-mobile-navigation"
      ref={ref}
      className={styles.container}
    >
      {navItems.map((item) => (
        <NavigationItem
          key={item.title}
          path={item.path}
          closeBurger={closeBurger}
        >
          {item.title}
        </NavigationItem>
      ))}
    </ul>
  );
});

MobileNavigation.propTypes = {
  items: PropTypes.array,
  closeBurger: PropTypes.func,
};

MobileNavigation.displayName = 'MobileNavigation';

export default MobileNavigation;
