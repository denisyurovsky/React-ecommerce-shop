import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { orderState, orderStatus } from '../../../../constants/orderStatus';
import { formatDateWithFullMonth } from '../../../../helpers/formatData';

export const OrderDeliveryDate = ({
  status,
  deliveryDate,
  breakpointDisplayed = true,
}) => {
  return orderStatus[status].deliveryStatus ===
    orderStatus[orderState.DELIVERED].deliveryStatus && breakpointDisplayed ? (
    <Typography>
      Delivered on {formatDateWithFullMonth(deliveryDate)}
    </Typography>
  ) : (
    <></>
  );
};

OrderDeliveryDate.propTypes = {
  status: PropTypes.number,
  deliveryDate: PropTypes.string,
  breakpointDisplayed: PropTypes.bool,
};
