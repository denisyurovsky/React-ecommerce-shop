import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavigationItem.module.scss';

export const NavigationItem = ({ children, path }) => {
  return (
    <li className={styles.item}>
      <Link to={`${path}`}>{children}</Link>
    </li>
  );
};

NavigationItem.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node,
};
