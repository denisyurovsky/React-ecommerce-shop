import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { REQUEST_STATUS, USER_ROLE } from '../../constants/constants';
import { usePermission } from '../../hooks/usePermission/usePermission';
import { pageView } from '../../pages/ProductListPage/constants/constants';
import {
  getWishlistStatus,
  resetUpdateWishlistStatusAfterTimeout,
  updateWishList,
} from '../../store/user/userSlice';

import styles from './AddToWishListButton.module.scss';

const message = {
  errorAdd: (productName) =>
    `The product "${productName}" was not added to your wishlist by some reason. Please try again later`,
  errorRemove: (productName) =>
    `The product "${productName}" was not removed from your wishlist by some reason. Please try again later`,
  successAdd: (productName) =>
    `The product "${productName}" was successfully added to your wishlist`,
  successRemove: (productName) =>
    `The product "${productName}" was successfully removed from your wishlist`,
};

const AddToWishListButton = ({
  productId,
  productName,
  cardShape,
  isAddedToWishlist,
}) => {
  const status = useSelector(getWishlistStatus);
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const shape = cardShape ? cardShape : pageView.MODULE_VIEW;
  const isShowed = usePermission(USER_ROLE.CONSUMER);

  const handleClick = () => {
    setIsClicked(true);
    dispatch(updateWishList(productId));
  };
  const containerClasses = `${styles.container} ${styles[shape]}`;

  useEffect(() => {
    if (isClicked) {
      if (status === REQUEST_STATUS.FULFILLED) {
        toast.success(
          isAddedToWishlist
            ? message.successAdd(productName)
            : message.successRemove(productName)
        );
        dispatch(resetUpdateWishlistStatusAfterTimeout());
        setIsClicked(false);
      }
      if (status === REQUEST_STATUS.REJECTED) {
        toast.error(
          isAddedToWishlist
            ? message.errorRemove(productName)
            : message.errorAdd(productName)
        );
        dispatch(resetUpdateWishlistStatusAfterTimeout());
      }
    }
  }, [status, isClicked, dispatch, productName, isAddedToWishlist]);

  if (!isShowed) {
    return null;
  }

  return (
    <IconButton
      className={containerClasses}
      aria-label="wish"
      component="span"
      onClick={handleClick}
    >
      {isAddedToWishlist ? (
        <FavoriteIcon className={styles.added} />
      ) : (
        <FavoriteBorderIcon className={styles.nonAdded} />
      )}
    </IconButton>
  );
};

AddToWishListButton.propTypes = {
  productId: PropTypes.number,
  productName: PropTypes.string,
  cardShape: PropTypes.string,
  isAddedToWishlist: PropTypes.bool,
};

export default AddToWishListButton;
