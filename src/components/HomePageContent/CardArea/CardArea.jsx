import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './CardArea.module.scss';

export const CardArea = ({ children }) => (
  <Container className={styles.wrapper}>
    <Typography variant="body1" color="text.secondary">
      Recently added
    </Typography>
    {children}
  </Container>
);

CardArea.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
