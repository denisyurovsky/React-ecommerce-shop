import { CircularProgress, Container } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function Spinner({ height, width, style }) {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: width,
        ...style,
      }}
    >
      <CircularProgress />
    </Container>
  );
}

Spinner.propTypes = {
  style: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Spinner;
