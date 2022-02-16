import { Toolbar, Typography } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Footer.module.scss';

export const Footer = ({ isProfileMobile }) => {
  const date = new Date();

  const appbarClasses = classNames({
    [styles.appbar]: true,
    [styles.offset]: isProfileMobile,
  });

  return (
    <footer className={appbarClasses}>
      <Toolbar className={styles.toolBar}>
        <Typography
          data-testid="copyright"
          variant="body3"
          className={styles.copyright}
        >
          EPAM Systems © {date.getFullYear()}
        </Typography>
      </Toolbar>
    </footer>
  );
};

Footer.propTypes = {
  isProfileMobile: PropTypes.bool,
};
