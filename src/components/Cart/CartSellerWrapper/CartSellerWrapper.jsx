import { Checkbox, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import productsApi from '../../../api/products';
import { getUser } from '../../../api/user';
import { notificationError } from '../../../constants/constants';
import {
  selectCart,
  selectSellersProducts,
} from '../../../store/cart/cartSlice';
import { CartProductCard } from '../CartProductCard/CartProductCard';

import styles from './CartSellerWrapper.module.scss';

export const CartSellerWrapper = ({
  userId,
  products,
  openModal,
  setModalProduct,
}) => {
  const dispatch = useDispatch();
  const [sellersProducts, setSellersProducts] = useState([]);
  const [seller, setSeller] = useState();
  const cart = useSelector(selectCart);

  useEffect(() => {
    const abortController = new AbortController();

    const ids = products.map((item) => {
      return item.productId;
    });

    const getSellersProducts = async (ids) => {
      try {
        const response = await productsApi.getProductsByIds(
          ids,
          abortController
        );

        setSellersProducts(response.data);
      } catch (err) {
        if (!abortController.signal.aborted) {
          toast(notificationError);
        }
      }
    };

    if (ids.length !== 0) {
      getSellersProducts(ids);
    } else {
      setSellersProducts([]);
    }

    return () => {
      abortController.abort();
    };
  }, [products]);

  useEffect(() => {
    const getSeller = async () => {
      try {
        const userById = await getUser(userId);

        setSeller(userById.data);
      } catch (err) {
        toast(notificationError);
      }
    };

    getSeller();
  }, [userId]);

  const sellerCheckboxHandler = () => {
    dispatch(selectSellersProducts({ sellerId: userId }));
  };

  return (
    <div>
      <Box className={styles.names}>
        <Checkbox
          checked={cart.sellers[userId] ? cart.sellers[userId].checked : true}
          onChange={sellerCheckboxHandler}
        />
        <Typography fontSize={25}>
          {seller && seller.firstName} &nbsp;
        </Typography>
        <Typography fontSize={25}>{seller && seller.lastName}</Typography>
      </Box>
      <Box>
        {sellersProducts &&
          sellersProducts.map((product) => (
            <CartProductCard
              key={product.id}
              product={product}
              openModal={openModal}
              setModalProduct={setModalProduct}
            />
          ))}
      </Box>
    </div>
  );
};

CartSellerWrapper.propTypes = {
  userId: PropTypes.number,
  products: PropTypes.array,
  openModal: PropTypes.func,
  setModalProduct: PropTypes.func,
};
