import PropTypes from 'prop-types';
import React from 'react';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

import styles from './Layout.module.scss';

export const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};
