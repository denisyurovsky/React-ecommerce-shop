import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { formatDiscountInPercents } from '../../helpers/utils/formatData';

import styles from './DiscountLabel.module.scss';

export const DiscountLabel = ({ price, discountPrice }) => {
  return (
    <Typography className={styles.label}>
      {formatDiscountInPercents(price, discountPrice)}
    </Typography>
  );
};

DiscountLabel.propTypes = {
  price: PropTypes.number,
  discountPrice: PropTypes.number,
};
