import propTypes from 'prop-types';
import React from 'react';

import styles from './Title.module.scss';

export const Title = ({ children }) => {
  return (
    <h2 data-testid="title" className={styles.header}>
      {children}
    </h2>
  );
};

Title.propTypes = {
  children: propTypes.string,
};
