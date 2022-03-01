import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavigationItem.module.scss';

export const NavigationItem = ({ children, path, closeBurger }) => {
  return (
    <li
      className={styles.item}
      role="tab"
      tabIndex={0}
      onClick={closeBurger}
      onKeyDown={closeBurger}
    >
      <Link to={`${path}`}>{children}</Link>
    </li>
  );
};

NavigationItem.defaultProps = {
  closeBurger: () => {},
};

NavigationItem.propTypes = {
  closeBurger: PropTypes.func.isRequired,
  path: PropTypes.string,
  children: PropTypes.node,
};
