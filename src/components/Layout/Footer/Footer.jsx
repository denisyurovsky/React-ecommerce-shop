import { Toolbar, Typography } from '@mui/material';
import React from 'react';

import styles from './Footer.module.scss';

export const Footer = () => {
  const date = new Date();

  return (
    <footer className={styles.appbar}>
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
