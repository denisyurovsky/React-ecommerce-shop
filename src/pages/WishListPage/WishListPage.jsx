import { Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getProductsByIds } from '../../api/products';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Card from '../../components/ProductCard/Card/Card';
import { Title } from '../../components/Title/Title';
import { notificationError } from '../../helpers/constants/constants';
import { getWishlist, selectUser } from '../../store/user/userSlice';
import { pageView } from '../ProductListPage/constants/constants';

import styles from './WishListPage.module.scss';

export const WishListPage = () => {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const wishlist = useSelector(getWishlist);
  const isWished = (productId, wishlist) => new Set(wishlist).has(productId);

  const links = [
    { url: '/', text: 'Home' },
    { url: '/profile', text: 'Profile' },
  ];

  useEffect(() => {
    const wishlistIds = user.user.wishlist;

    const getWishListProducts = async (wishlistIds) => {
      try {
        const response = await getProductsByIds(wishlistIds);

        setProducts(response.data);
      } catch (err) {
        toast(notificationError);
      }
    };

    getWishListProducts(wishlistIds);
  }, [user.user.wishlist]);

  return (
    <div className={styles.page}>
      <Breadcrumbs links={links} />
      <Title>Wishlist</Title>
      {!products || products.length === 0 ? (
        <Typography className={styles.emptyWishList}>
          Your Wishlist is empty
        </Typography>
      ) : (
        <Box className={styles.cardsContainer}>
          {products.map((product) => (
            <Card
              key={product.id}
              product={{
                ...product,
                isAddedToWishlist: isWished(product.id, wishlist),
              }}
              cardShape={pageView.MODULE_VIEW}
            />
          ))}
        </Box>
      )}
    </div>
  );
};
