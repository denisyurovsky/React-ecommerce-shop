import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { OrderCard } from '../OrderCard/OrderCard';

import styles from './OrdersCards.module.scss';

export const OrdersCards = ({ displayedOrders }) => {
  return displayedOrders.length === 0 ? (
    <Typography align="center" className={styles.noOrders}>
      There are no orders to display, you can order something at any time
    </Typography>
  ) : (
    displayedOrders.map((order) => (
      <OrderCard key={order.id} orderId={order.id} />
    ))
  );
};

OrdersCards.propTypes = {
  displayedOrders: PropTypes.array,
};
