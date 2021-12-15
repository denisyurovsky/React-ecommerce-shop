import PropTypes from 'prop-types';
import React from 'react';

import styles from './NavigationItem.module.scss';

export const NavigationItem = ({ children }) => {
  return (
    <li className={styles.item}>
      <a href="/">{children}</a>
    </li>
  );
};

NavigationItem.propTypes = {
  children: PropTypes.node,
};
