import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationList.module.scss';

const navItems = [
  { title: 'home', path: '/' },
  { title: 'products', path: '/products' },
];

export const NavigationList = () => (
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
