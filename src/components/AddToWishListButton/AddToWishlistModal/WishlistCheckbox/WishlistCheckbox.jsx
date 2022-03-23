import { Typography, Box, Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './WishlistCheckbox.module.scss';

export const WishlistCheckbox = ({ wishlist, updateWishlistProducts }) => {
  const handleCheckboxChange = () => {
    updateWishlistProducts(wishlist.name);
  };

  return (
    <Box className={styles.wishlist}>
      <Checkbox
        checked={wishlist.checked}
        onChange={handleCheckboxChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Typography className={styles.name}>{wishlist.name}</Typography>
    </Box>
  );
};

WishlistCheckbox.propTypes = {
  wishlist: PropTypes.shape({
    name: PropTypes.string,
    checked: PropTypes.bool,
  }).isRequired,
  updateWishlistProducts: PropTypes.func.isRequired,
};
