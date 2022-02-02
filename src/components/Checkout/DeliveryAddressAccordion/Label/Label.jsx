import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Label.module.scss';

const Label = ({ handleEditButton, address }) => {
  const {
    title,
    name,
    surname,
    country: { name: countryName },
    city,
    street,
    building,
    phone,
    flat,
    zip,
  } = address;

  return (
    <Box className={styles.addressCard}>
      <Box>
        <Typography className={styles.paragraph} variant="caption">
          {title} {name} {surname}
        </Typography>
        <Typography className={styles.paragraph} variant="caption">
          {phone}
        </Typography>
        <Typography
          className={`${styles.paragraph} ${styles.country}`}
          variant="caption"
        >
          {countryName}, {city}
        </Typography>
        <Typography className={styles.paragraph} variant="caption">
          {street}, {building}, {flat}
        </Typography>
        <Typography className={styles.paragraph} variant="caption">
          {zip}
        </Typography>
      </Box>
      <IconButton
        onClick={handleEditButton}
        className={styles.iconButton}
        color="primary"
        component="span"
      >
        <EditIcon />
      </IconButton>
    </Box>
  );
};

Label.propTypes = {
  handleEditButton: PropTypes.func,
  address: PropTypes.object,
};

export default Label;
