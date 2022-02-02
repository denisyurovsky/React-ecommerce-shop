import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './AccordionSummaryInfo.module.scss';

const AccordionSummaryInfo = ({ address }) => {
  const {
    title,
    name,
    surname,
    country: { name: countryName },
    city,
    street,
    building,
    phone,
    zip,
  } = address;

  return (
    <Box className={styles.body}>
      <Typography variant="caption" data-testid="fullName">
        {title} {name} {surname}
      </Typography>
      <Typography sx={{ mb: 2 }} variant="caption">
        {phone}
      </Typography>
      <Typography variant="caption">
        {countryName}, {city}
      </Typography>
      <Typography sx={{ mb: 2 }} variant="caption">
        {street}, {building}
      </Typography>
      <Typography variant="caption">{zip}</Typography>
    </Box>
  );
};

AccordionSummaryInfo.propTypes = {
  address: PropTypes.object.isRequired,
};

export default AccordionSummaryInfo;
