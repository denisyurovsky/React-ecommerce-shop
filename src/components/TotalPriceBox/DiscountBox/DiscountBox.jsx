import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { formatPrice } from '../../../helpers/formatData';

import styles from './DiscountBox.module.scss';

const DiscountBox = ({ sellersDiscount, personalDiscount }) => {
  const totalDiscount = sellersDiscount + personalDiscount;
  const isSellerDiscount = Boolean(sellersDiscount);
  const isPersonalDiscount = Boolean(personalDiscount);

  if (!isPersonalDiscount && !isSellerDiscount) {
    return null;
  }

  return (
    <Box className={styles.container}>
      {isPersonalDiscount && isSellerDiscount && (
        <p className={styles.title}>Discounts:</p>
      )}
      <table className={styles.table}>
        <tbody>
          {isSellerDiscount && (
            <tr className={styles.row}>
              <td>General discounts:</td>
              <td>-&nbsp;{formatPrice(sellersDiscount)}</td>
            </tr>
          )}
          {isPersonalDiscount && (
            <tr className={styles.row}>
              <td>Personal discounts:</td>
              <td>-&nbsp;{formatPrice(personalDiscount)}</td>
            </tr>
          )}
          {isPersonalDiscount && isSellerDiscount && (
            <tr className={styles.row}>
              <td>Total discounts:</td>
              <td>-&nbsp;{formatPrice(totalDiscount)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Box>
  );
};

DiscountBox.propTypes = {
  sellersDiscount: PropTypes.number,
  personalDiscount: PropTypes.number,
};

export default DiscountBox;
