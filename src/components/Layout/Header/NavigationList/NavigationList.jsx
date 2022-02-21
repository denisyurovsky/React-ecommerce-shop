import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { USER_ROLE } from '../../../../helpers/constants/constants';
import { pathNames } from '../../../../helpers/constants/pathNames/pathNames';
import { getUserRole } from '../../../../store/user/userSlice';

import styles from './NavigationList.module.scss';

export const NavigationList = () => {
  const userRole = useSelector(getUserRole);

  const navItems = [
    { title: 'home', path: '/' },
    { title: 'products', path: pathNames.PRODUCTS },
  ];

  if (userRole === USER_ROLE.ADMIN || userRole === USER_ROLE.SELLER) {
    navItems.push({ title: 'admin', path: pathNames.ADMIN });
  }

  return (
    <ul data-testid="header-navigation-list" className={styles.list}>
      {navItems.map((navItem, i) => (
        <NavLink
          end
          to={navItem.path}
          key={`navItem${i}`}
          className={styles.link}
        >
          {navItem.title}
        </NavLink>
      ))}
    </ul>
  );
};
