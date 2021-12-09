import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

export const CardArea = ({ children }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="body1" color="text.secondary">
        Recently added
      </Typography>
      {children}
    </Container>
  );
};

CardArea.propTypes = {
  children: PropTypes.node,
};
