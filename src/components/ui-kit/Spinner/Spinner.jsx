import { CircularProgress, Container } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Spinner.module.scss';

const Spinner = ({ height, width, style, isAbsolute = false }) => {
  const classes = classNames({
    [styles.container]: true,
    [styles.absolute]: isAbsolute,
  });

  return (
    <Container
      className={classes}
      sx={{
        height: height,
        width: width,
        ...style,
      }}
    >
      <CircularProgress />
    </Container>
  );
};

Spinner.propTypes = {
  style: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isAbsolute: PropTypes.bool,
};

export default Spinner;
