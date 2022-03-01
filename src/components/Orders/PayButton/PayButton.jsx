import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { pathNames } from '../../../constants/pathNames';
import Link from '../../ui-kit/Link/Link';

import styles from './PayButton.module.scss';

export const PayButton = ({ orderIndex }) => {
  return (
    <Link
      style={{ width: 'unset' }}
      to={`${pathNames.CHECKOUT}/${orderIndex}`}
      isWhite
      isUppercase
    >
      <Button className={styles.button} variant="contained">
        Buy now
      </Button>
    </Link>
  );
};

PayButton.propTypes = {
  orderIndex: PropTypes.number.isRequired,
};
