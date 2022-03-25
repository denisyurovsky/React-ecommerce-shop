import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { pathNames } from '../../../../constants/pathNames';
import { makeClassBasingOnPath } from '../../../../helpers/makeClassBasingOnPath';
import { getUserRole } from '../../../../store/user/userSlice';
import { Role } from '../../../../ts/enums/enums';

import styles from './NavigationList.module.scss';

export const NavigationList = () => {
  const userRole = useSelector(getUserRole);
  const navItems = [
    { title: 'home', path: '/' },
    { title: 'products', path: pathNames.PRODUCTS },
  ];

  if (userRole === Role.Admin || userRole === Role.Seller) {
    navItems.push({ title: 'admin', path: pathNames.ADMIN });
  }

  return (
    <ul data-testid="header-navigation-list" className={styles.list}>
      {navItems.map((navItem, i) => (
        <NavLink
          end
          to={navItem.path}
          key={`navItem${i}`}
          className={makeClassBasingOnPath(
            navItem.path,
            styles.link,
            styles.active
          )}
        >
          {navItem.title}
        </NavLink>
      ))}
    </ul>
  );
};
