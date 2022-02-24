import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { OrdersCards } from '../../components/Orders/OrdersCards/OrdersCards';
import { Title } from '../../components/Title/Title';
import Spinner from '../../components/ui-kit/Spinner/Spinner';
import { orderState, orderStatus } from '../../helpers/constants/orderStatus';
import { getOrders, selectOrders } from '../../store/orders/ordersSlice';

import { breadcrumbsLinks } from './constants/constants';

import styles from './OrdersPage.module.scss';

export const OrdersPage = () => {
  const { orders, isLoading } = useSelector(selectOrders);
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState(0);
  const [displayedOrders, setDisplayedOrders] = useState([]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders) {
      setDisplayedOrders(orders);
    }
  }, [orders]);

  const handleSelectChange = (event) => {
    setStatusFilter(event.target.value);
    setDisplayedOrders(
      orders.filter((order) => {
        if (event.target.value === 0) {
          return true;
        }

        return order.status === event.target.value;
      })
    );
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs links={breadcrumbsLinks} />
      <div className={styles.header}>
        <Title>My orders</Title>
        {orders && (
          <FormControl variant="standard" className={styles.selectForm}>
            <InputLabel id="demo-simple-select-standard-label">
              Display
            </InputLabel>
            <Select
              data-testid="ordersPageSelect"
              className={styles.select}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={statusFilter}
              onChange={handleSelectChange}
            >
              <MenuItem value={0}>All</MenuItem>
              {Object.keys(orderState).map((status) => {
                const text =
                  orderState[status] === orderState.DELIVERED
                    ? orderStatus[orderState[status]].deliveryStatus
                    : orderStatus[orderState[status]].paymentStatus;

                return (
                  <MenuItem key={orderState[status]} value={orderState[status]}>
                    {text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </div>

      <div className={styles.cardsContainer}>
        {isLoading ? (
          <Spinner width={'100%'} height={'100%'} />
        ) : (
          <OrdersCards displayedOrders={displayedOrders} />
        )}
      </div>
    </div>
  );
};
