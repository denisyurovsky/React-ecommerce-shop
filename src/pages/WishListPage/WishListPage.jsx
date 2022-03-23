import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProfileLayout from '../../components/Profile/ProfileLayout/ProfileLayout';
import WishlistCard from '../../components/WishlistCard/WishlistCard';
import { LINKS } from '../../constants/linkConstants';
import {
  getWishlists,
  getWishlistsStatus,
  resetUpdateWishlistsStatusAfterTimeout,
} from '../../store/user/userSlice';

import styles from './WishListPage.module.scss';

export const WishListPage = () => {
  const wishlists = useSelector(getWishlists);
  const status = useSelector(getWishlistsStatus);
  const dispatch = useDispatch();
  const [expandedWishlistName, setExpandedWishlistName] = useState(null);

  const changeExpandedWishlist = (wishlistId) => {
    setExpandedWishlistName(wishlistId);
  };

  const checkIsNameUnique = (name, id) => {
    const wishlistsWithoutCurrent = wishlists.filter(
      (wishlist) => wishlist.id !== id
    );

    return !wishlistsWithoutCurrent.some((wishlist) => name === wishlist.name);
  };

  useEffect(() => {
    dispatch(resetUpdateWishlistsStatusAfterTimeout());
  }, [status, dispatch]);

  return (
    <ProfileLayout title={LINKS.WISHLIST.text}>
      <div className={styles.page}>
        <Box className={styles.cardsContainer}>
          {wishlists.map((wishlist) => {
            return (
              <WishlistCard
                wishlist={{
                  ...wishlist,
                  isExpanded: wishlist.id === expandedWishlistName,
                }}
                key={wishlist.id}
                changeExpandedWishlist={changeExpandedWishlist}
                checkIsNameUnique={checkIsNameUnique}
              />
            );
          })}
        </Box>
      </div>
    </ProfileLayout>
  );
};
