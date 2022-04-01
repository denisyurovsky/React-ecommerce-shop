import AddIcon from '@mui/icons-material/Add';
import { Typography, Box, Button } from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Modal from '../../../components/ui-kit/Modal/Modal';
import { MODAL_SIZES, notificationError } from '../../../constants/constants';
import { UPDATE_WISHLIST_TYPE } from '../../../constants/wishlists/wishlists';
import {
  getCheckedWishlists,
  getWishlistsStatus,
  updateWishlists,
} from '../../../store/user/userSlice';
import { FetchStatus } from '../../../ts/enums/enums';

import { CreateWishlistForm } from './CreateWishlistForm/CreateWishlistForm';
import { WishlistCheckbox } from './WishlistCheckbox/WishlistCheckbox';

import styles from './AddToWishlistModal.module.scss';

const message = {
  successAdd: (productName, wishlistName) =>
    `Products "${productName}" was successful added to the wishlist "${wishlistName}"`,
  successRemove: (productName, wishlistName) =>
    `Products "${productName}" was successful removed from the wishlist "${wishlistName}"`,
};

export const AddToWishlistModal = ({
  isModalOpen,
  closeWishlistModal,
  productId,
  productName,
}) => {
  const checkedWishlists = useSelector((state) =>
    getCheckedWishlists(state, productId)
  );
  const status = useSelector(getWishlistsStatus);
  const [isAdd, setIsAdd] = useState(false);
  const [updatedWishlistName, setUpdatedWishlistName] = useState(null);
  const dispatch = useDispatch();
  const handleAddWishlistButtonClick = () => {
    setIsAdd(true);
  };

  const createWishlist = (wishlistName) => {
    setUpdatedWishlistName(wishlistName);
    const newWishlist = {
      id: _.uniqueId(`${wishlistName}_`),
      name: wishlistName,
      productIds: [productId],
    };
    const updateAction = {
      type: UPDATE_WISHLIST_TYPE.NEW,
      argument: newWishlist,
    };

    dispatch(updateWishlists(updateAction));
  };

  const closeModal = () => {
    setIsAdd(false);
    closeWishlistModal();
  };

  const closeCreateWishlistForm = () => {
    closeModal();
  };

  const updateWishlistProducts = (wishlistName) => {
    setUpdatedWishlistName(wishlistName);
    const argument = {
      productId: productId,
      wishlistName: wishlistName,
    };
    const updateAction = {
      type: UPDATE_WISHLIST_TYPE.CHECK_PRODUCT,
      argument: argument,
    };

    dispatch(updateWishlists(updateAction));
  };

  useEffect(() => {
    if (status === FetchStatus.Fulfilled && isModalOpen) {
      checkedWishlists.filter(
        (wishlist) => wishlist.name === updatedWishlistName
      )[0].checked
        ? toast.success(message.successAdd(productName, updatedWishlistName))
        : toast.success(
            message.successRemove(productName, updatedWishlistName)
          );
    }
    if (status === FetchStatus.Rejected && isModalOpen) {
      toast.error(notificationError);
    }
  }, [status]); // eslint-disable-line

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} size={MODAL_SIZES.SMALL}>
      <Box className={styles.modalContent}>
        <Typography className={styles.title}>Choose wishlist</Typography>
        <Box className={styles.wishlists}>
          {checkedWishlists.map((wishlist) => (
            <WishlistCheckbox
              key={wishlist.name}
              wishlist={wishlist}
              updateWishlistProducts={updateWishlistProducts}
            />
          ))}
        </Box>
        {!isAdd ? (
          <Button
            className={styles.addButton}
            onClick={handleAddWishlistButtonClick}
            data-testid="addButton"
            data-cy="addWishlistBtn"
          >
            <AddIcon className={styles.addIcon} />
            <Typography>Add new wishlist</Typography>
          </Button>
        ) : (
          <CreateWishlistForm
            checkedWishlists={checkedWishlists}
            createWishlist={createWishlist}
            closeCreateWishlistForm={closeCreateWishlistForm}
          />
        )}
      </Box>
    </Modal>
  );
};

AddToWishlistModal.propTypes = {
  isModalOpen: PropTypes.bool,
  productId: PropTypes.number,
  productName: PropTypes.string,
  closeWishlistModal: PropTypes.func,
};
