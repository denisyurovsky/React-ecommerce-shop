import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getOrderById } from '../../api/orders';
import { getProductsByIds } from '../../api/products';
import BasicBreadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import CheckoutGuestPage from '../../components/Checkout/CheckoutGuestPage/CheckoutGuestPage';
import CheckoutUserPage from '../../components/Checkout/CheckoutUserPage/CheckoutUserPage';
import OrderCard from '../../components/Checkout/OrderCard/OrderCard';
import { Title } from '../../components/Title/Title';
import Link from '../../components/ui-kit/Link/Link';
import Spinner from '../../components/ui-kit/Spinner/Spinner';
import { notificationError } from '../../constants/constants';
import { orderState } from '../../constants/orderStatus';
import getCheckedProductsQuantity from '../../helpers/getCheckedProductsQuantity';
import getProductQuantity from '../../helpers/getProductQuantity';
import getSelectedProductIds from '../../helpers/getSelectedProductIds';
import { selectCart } from '../../store/cart/cartSlice';
import { selectUser } from '../../store/user/userSlice';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

import { EMPTY_ORDER, LINKS } from './constants/constants';

import styles from './CheckoutPage.module.scss';

const CheckoutPage = () => {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const orderURLId = Number(useParams().id);
  const [orderId, setOrderId] = useState(null);
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [orderedProductsInfo, setOrderedProductsInfo] = useState(EMPTY_ORDER);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (Number.isInteger(createdOrderId) || Number.isInteger(orderURLId)) {
      setOrderId(Number(createdOrderId || orderURLId));
    }
  }, [createdOrderId, orderURLId]);

  useEffect(() => {
    let isMounted = true;

    if (Number.isInteger(orderId)) {
      const setFetchedData = async () => {
        const response = await getOrderById(orderId);

        if (
          isMounted &&
          response.data[0]?.status === orderState.WAITING_FOR_PAYMENT
        ) {
          setOrderedProductsInfo(response.data[0]);
        }
      };

      try {
        setIsFetching(true);
        setFetchedData();
        setIsFetching(false);
      } catch (err) {
        toast.error(notificationError);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  useEffect(() => {
    let isMounted = true;

    if (!Number.isInteger(orderId)) {
      const setFetchedData = async () => {
        const selectedProductIds = getSelectedProductIds(cart.sellers);
        const response = await getProductsByIds(selectedProductIds);
        const products = response.data.map(
          ({ id, images, name, price, discountPrice }) => {
            return {
              originalProductId: id,
              images,
              name,
              price,
              discountPrice,
              quantity: getProductQuantity(cart.sellers, id),
            };
          }
        );

        if (isMounted) {
          setOrderedProductsInfo({
            ...EMPTY_ORDER,
            userId: user.user.id,
            products,
            totalPrice: cart.totalPrice,
            totalDiscountPrice: cart.totalDiscountPrice,
            totalQuantity: getCheckedProductsQuantity(cart.sellers),
          });
        }
      };

      try {
        setIsFetching(true);
        setFetchedData();
        setIsFetching(false);
      } catch (err) {
        toast.error(notificationError);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [cart, orderId, user.user.id]);

  const ActualPrice = () => {
    if (
      orderedProductsInfo.totalPrice === orderedProductsInfo.totalDiscountPrice
    ) {
      return <>{orderedProductsInfo.totalDiscountPrice} $</>;
    } else {
      return (
        <>
          <s>{orderedProductsInfo.totalPrice} $</s>{' '}
          {orderedProductsInfo.totalDiscountPrice}
        </>
      );
    }
  };

  if (isFetching) {
    return <Spinner height="90vh" />;
  }

  if (orderedProductsInfo.products.length === 0) {
    return <NotFoundPage />;
  }

  if (user.user.id !== orderedProductsInfo.userId) {
    return <NotFoundPage />;
  }

  return (
    <Box className={styles.container}>
      <BasicBreadcrumbs links={LINKS} />
      <Title>Checkout</Title>
      <Box className={styles.wrapper}>
        <Box className={styles.orderContainer}>
          {orderedProductsInfo.products.length > 0 && (
            <>
              <Box className={styles.orderHeader}>
                <Typography>{`Your order - ${orderedProductsInfo.totalDiscountPrice} $ (${orderedProductsInfo.totalQuantity} items)`}</Typography>
                {!orderId && (
                  <Link style={{ fontSize: 16, width: 'unset' }} to="/cart">
                    Edit Bag
                  </Link>
                )}
              </Box>
              {orderedProductsInfo.products.map(
                ({
                  originalProductId,
                  images,
                  name,
                  price,
                  discountPrice,
                  quantity,
                }) => {
                  return (
                    <OrderCard
                      key={originalProductId}
                      images={images}
                      name={name}
                      price={price}
                      discountPrice={discountPrice}
                      quantity={quantity}
                    />
                  );
                }
              )}
              <Box className={styles.orderBottom}>
                <Typography className={styles.orderPrice}>Total:</Typography>
                <Typography className={styles.orderPrice}>
                  <ActualPrice />
                </Typography>
              </Box>
            </>
          )}
        </Box>
        {!user.user.addresses.length && (
          <CheckoutGuestPage
            setCreatedOrderId={setCreatedOrderId}
            orderId={orderId}
            orderedProductsInfo={orderedProductsInfo}
          />
        )}
        {user.user.addresses.length > 0 && (
          <CheckoutUserPage
            setCreatedOrderId={setCreatedOrderId}
            orderId={orderId}
            orderedProductsInfo={orderedProductsInfo}
          />
        )}
      </Box>
    </Box>
  );
};

export default CheckoutPage;
