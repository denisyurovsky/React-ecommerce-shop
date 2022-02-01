import PropTypes from 'prop-types';
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
      {props.items.map((item) => (
        <NavigationItem key={item.name} path={item.link}>
          {item.name}
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
