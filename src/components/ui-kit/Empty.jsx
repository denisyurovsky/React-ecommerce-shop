import MoodIcon from '@mui/icons-material/Mood';
import { Container, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function Empty({ message }) {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="subtitle1">{message}</Typography>
      <MoodIcon sx={{ ml: 1 }} color="primary" />
    </Container>
  );
}

Empty.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Empty;
