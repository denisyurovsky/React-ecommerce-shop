import { Button } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { orderState } from '../../../helpers/constants/orderStatus';
import {
  cancelOrder,
  selectOrders,
  confirmOrder,
} from '../../../store/orders/ordersSlice';

export const OrderButton = ({ className, status, orderIndex }) => {
  const { orders } = useSelector(selectOrders);
  const dispatch = useDispatch();

  const isPaid = status == orderState.PAID;
  const text = isPaid ? 'Confirm delivery' : 'Cancel order';
  const resultClassName = classNames(className);

  const confirmHandler = () => {
    dispatch(confirmOrder({ order: orders[orderIndex] }));
  };

  const cancelHandler = () => {
    dispatch(cancelOrder({ order: orders[orderIndex] }));
  };

  const onClickHandler = isPaid ? confirmHandler : cancelHandler;

  return (
    <Button
      variant="contained"
      className={resultClassName}
      onClick={onClickHandler}
    >
      {text}
    </Button>
  );
};

OrderButton.propTypes = {
  className: PropTypes.string,
  status: PropTypes.number,
  orderIndex: PropTypes.number,
};
