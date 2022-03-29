import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { uniqueId } from 'lodash';
import React, { useEffect, useState, createContext } from 'react';
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
import TotalPriceBox from '../../components/TotalPriceBox/TotalPriceBox';
import Link from '../../components/ui-kit/Link/Link';
import Spinner from '../../components/ui-kit/Spinner/Spinner';
import { notificationError } from '../../constants/constants';
import { orderState } from '../../constants/orderStatus';
import getCheckedProductsQuantity from '../../helpers/getCheckedProductsQuantity';
import getProductQuantity from '../../helpers/getProductQuantity';
import getSelectedProductIds from '../../helpers/getSelectedProductIds';
import { selectCart } from '../../store/cart/cartSlice';
import { getUser } from '../../store/user/userSlice';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

import { EMPTY_ORDER, LINKS } from './constants/constants';

import styles from './CheckoutPage.module.scss';

export const CheckoutContext = createContext();

const CheckoutPage = () => {
  const user = useSelector(getUser);
  const cart = useSelector(selectCart);
  const orderURLId = Number(useParams().id);
  const [orderId, setOrderId] = useState(null);
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [orderedProductsInfo, setOrderedProductsInfo] = useState(EMPTY_ORDER);
  const [isFetching, setIsFetching] = useState(true);
  const [disabledAccordion, setDisabledAccordion] = useState({
    info: false,
    address: true,
    payment: true,
    confirmation: true,
  });

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
            userId: user.id,
            products,
            sellersDiscount: cart.sellersDiscount,
            personalDiscount: cart.personalDiscount,
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
  }, [cart, orderId, user.id]);

  if (isFetching) {
    return <Spinner height="90vh" />;
  }

  if (orderedProductsInfo.products.length === 0) {
    return <NotFoundPage />;
  }

  if (user.id !== orderedProductsInfo.userId) {
    return <NotFoundPage />;
  }

  return (
    <CheckoutContext.Provider value={[disabledAccordion, setDisabledAccordion]}>
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
                {orderedProductsInfo.products.map((product) => (
                  <OrderCard key={uniqueId('product')} {...product} />
                ))}
                <TotalPriceBox cart={orderedProductsInfo} />
              </>
            )}
          </Box>
          {!user.addresses.length && (
            <CheckoutGuestPage
              setCreatedOrderId={setCreatedOrderId}
              orderId={orderId}
              orderedProductsInfo={orderedProductsInfo}
            />
          )}
          {Boolean(user.addresses.length) && (
            <CheckoutUserPage
              setCreatedOrderId={setCreatedOrderId}
              orderId={orderId}
              orderedProductsInfo={orderedProductsInfo}
            />
          )}
        </Box>
      </Box>
    </CheckoutContext.Provider>
  );
};

export default CheckoutPage;
