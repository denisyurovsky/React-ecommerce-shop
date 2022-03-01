import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/system';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OrdersCards } from '../../components/Orders/OrdersCards/OrdersCards';
import ProfileLayout from '../../components/Profile/ProfileLayout/ProfileLayout';
import Spinner from '../../components/ui-kit/Spinner/Spinner';
import { LINKS } from '../../constants/linkConstants';
import { orderState, orderStatus } from '../../constants/orderStatus';
import { getOrders, selectOrders } from '../../store/orders/ordersSlice';

import styles from './OrdersPage.module.scss';

const specialYearValues = {
  REST: 'Rest',
  ALL: 'All',
};

export const OrdersPage = () => {
  const { orders, isLoading } = useSelector(selectOrders);
  const dispatch = useDispatch();

  const [statusFilter, setStatusFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState(specialYearValues.ALL);
  const [displayedOrders, setDisplayedOrders] = useState([]);

  const currentYear = new Date().getFullYear();

  const years = [currentYear, currentYear - 1, currentYear - 2];

  const suitableStatus = (status, statusFilter) => {
    return status === statusFilter || statusFilter === 0;
  };

  const suitableYear = (year, yearFilter) => {
    if (yearFilter === null || yearFilter === specialYearValues.ALL) {
      return true;
    }

    return (
      year === yearFilter ||
      (yearFilter === specialYearValues.REST && year < currentYear - 2)
    );
  };

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
        return (
          suitableYear(new Date(order.createdAt).getFullYear(), yearFilter) &&
          suitableStatus(order.status, event.target.value)
        );
      })
    );
  };

  const filterByYear = (event) => {
    const value = Number(event.target.textContent)
      ? Number(event.target.textContent)
      : event.target.textContent;

    let doubleMark = value === yearFilter;

    if (value === yearFilter) {
      setYearFilter(null);
    } else {
      setYearFilter(value);
    }

    setDisplayedOrders(
      orders.filter((order) => {
        return (
          suitableYear(
            new Date(order.createdAt).getFullYear(),
            doubleMark ? null : value
          ) && suitableStatus(order.status, statusFilter)
        );
      })
    );
  };

  return (
    <ProfileLayout title={LINKS.ORDERS.text}>
      <div className={styles.page}>
        <div className={styles.header}>
          {orders && (
            <Box className={styles.filterBox}>
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
                      <MenuItem
                        key={orderState[status]}
                        value={orderState[status]}
                      >
                        {text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Stack
                direction="row"
                spacing={2}
                mt={3}
                className={styles.chipStack}
              >
                <Chip
                  disabled={yearFilter === specialYearValues.ALL}
                  onClick={filterByYear}
                  className={classNames(
                    styles.chip,
                    yearFilter === specialYearValues.ALL
                      ? styles.activeChip
                      : ''
                  )}
                  label={specialYearValues.ALL}
                />
                {years.map((year) => (
                  <Chip
                    disabled={yearFilter === year}
                    onClick={filterByYear}
                    key={year}
                    className={classNames(
                      styles.chip,
                      yearFilter === year ? styles.activeChip : ''
                    )}
                    label={year}
                  />
                ))}
                <Chip
                  disabled={yearFilter === specialYearValues.REST}
                  onClick={filterByYear}
                  className={classNames(
                    styles.chip,
                    yearFilter === specialYearValues.REST
                      ? styles.activeChip
                      : ''
                  )}
                  label={specialYearValues.REST}
                />
              </Stack>
            </Box>
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
    </ProfileLayout>
  );
};
