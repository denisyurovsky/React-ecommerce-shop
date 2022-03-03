import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

import { USER_ROLE } from '../../../../constants/constants';
import { pathNames } from '../../../../constants/pathNames';
import { getUserRole } from '../../../../store/user/userSlice';
import { NavigationItem } from '../NavigationItem/NavigationItem';

import styles from './MobileNavigation.module.scss';

const MobileNavigation = forwardRef((props, ref) => {
  const userRole = useSelector(getUserRole);

  const navItems = [
    { title: 'HOME', path: '/' },
    { title: 'PRODUCTS', path: pathNames.PRODUCTS },
  ];

  if (userRole === USER_ROLE.ADMIN || userRole === USER_ROLE.SELLER) {
    navItems.push({ title: 'ADMIN', path: pathNames.ADMIN });
  }

  return (
    <ul
      data-testid="header-mobile-navigation"
      ref={ref}
      className={styles.container}
    >
      {navItems.map((item) => (
        <NavigationItem key={item.title} path={item.path}>
          {item.title}
        </NavigationItem>
      ))}
    </ul>
  );
});

MobileNavigation.propTypes = {
  items: PropTypes.array,
};

MobileNavigation.displayName = 'MobileNavigation';

export default MobileNavigation;
