import StarRateIcon from '@mui/icons-material/StarRate';
import { Box, Typography, FormLabel, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from './productRating.module.scss';

const labels = {
  1: 'Awful',
  2: 'Bad',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

const ProductRating = ({ value, onChange }) => {
  const [hover, setHover] = useState(-1);

  const handleChange = (_, newValue) => onChange(newValue);
  const handleHover = (_, newValue) => setHover(newValue);

  const getLabelText = (value) => `${value} Star${value !== 1 ? 's' : ''}`;

  return (
    <>
      <FormLabel component="legend">Rating</FormLabel>
      <Box className={styles.container}>
        <Rating
          name="hover-feedback"
          value={value}
          onChange={handleChange}
          onChangeActive={handleHover}
          emptyIcon={
            <StarRateIcon style={{ opacity: 0.55 }} fontSize="inherit" />
          }
          getLabelText={getLabelText}
        />
        <Typography component="legend" sx={{ ml: 2 }}>
          {value !== null && labels[hover !== -1 ? hover : value]}
        </Typography>
      </Box>
    </>
  );
};

ProductRating.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default ProductRating;
