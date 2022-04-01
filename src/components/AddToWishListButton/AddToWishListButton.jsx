import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { usePermission } from '../../hooks/usePermission/usePermission';
import { pageView } from '../../pages/ProductListPage/constants/constants';
import { getIsWished } from '../../store/user/userSlice';
import { Role } from '../../ts/enums/enums';

import { AddToWishlistModal } from './AddToWishlistModal/AddToWishlistModal';

import styles from './AddToWishListButton.module.scss';

const AddToWishListButton = ({ productId, productName, cardShape }) => {
  const shape = cardShape ? cardShape : pageView.MODULE_VIEW;
  const isShowed = usePermission([Role.Consumer]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isWished = useSelector((state) => getIsWished(state, productId));

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isShowed) {
    return null;
  }

  return (
    <>
      <IconButton
        className={`${styles.container} ${styles[shape]}`}
        aria-label="wish"
        component="span"
        onClick={handleClick}
        data-cy="addToWishlists"
      >
        {isWished ? (
          <FavoriteIcon className={styles.added} />
        ) : (
          <FavoriteBorderIcon className={styles.nonAdded} />
        )}
      </IconButton>
      <AddToWishlistModal
        isModalOpen={isModalOpen}
        closeWishlistModal={closeModal}
        productId={productId}
        productName={productName}
      />
    </>
  );
};

AddToWishListButton.propTypes = {
  productId: PropTypes.number,
  productName: PropTypes.string,
  cardShape: PropTypes.string,
};

export default AddToWishListButton;
