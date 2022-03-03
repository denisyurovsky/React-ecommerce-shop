import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import AddressCard from '../../components/AddressBook/AddressCard/AddressCard';
import CreateOrEditAddressModal from '../../components/AddressBook/CreateOrEditAddressModal/CreateOrEditAddressModal';
import ProfileLayout from '../../components/Profile/ProfileLayout/ProfileLayout';
import Spinner from '../../components/ui-kit/Spinner/Spinner';
import { notificationError } from '../../constants/constants';
import { LINKS } from '../../constants/linkConstants';
import usePrevious from '../../hooks/usePrevious';
import {
  getAddressesByIds,
  selectAddresses,
} from '../../store/addresses/addressesSlice';

import { EMPTY_ADDRESS, MODAL_TYPE } from './constants/constants';

import styles from './AddressBook.module.scss';

const AddressBook = () => {
  const dispatch = useDispatch();
  const addresses = useSelector(selectAddresses);
  const user = useSelector((state) => state.user);
  const addressIds = user.user.addresses;

  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalType, setModalType] = useState(MODAL_TYPE.EDIT);

  useEffect(() => {
    dispatch(getAddressesByIds(addressIds));
  }, [addressIds, dispatch]);

  useEffect(() => {
    setIsLoading(addresses.isLoading || user.isLoading);
  }, [addresses.isLoading, user.isLoading]);

  const { errorOccurred: addressesErrorOccurred } = addresses;
  const { errorOccurred: userErrorOccurred } = user;
  const prevAmount = usePrevious({
    addressesErrorOccurred,
    userErrorOccurred,
  });

  useEffect(() => {
    const isErrorOccurred = addressesErrorOccurred || userErrorOccurred;

    if (prevAmount) {
      const isErrorOccurredPrev =
        prevAmount.addressesErrorOccurred || prevAmount.userErrorOccurred;

      if (isErrorOccurredPrev !== isErrorOccurred && isErrorOccurred) {
        toast.error(notificationError);
      }
    }
  }, [addressesErrorOccurred, userErrorOccurred, prevAmount]);

  const handleCloseModal = () => setIsOpenModal(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleAddButton = () => {
    handleOpenModal();
    setModalType(MODAL_TYPE.ADD);
    setAddress(EMPTY_ADDRESS);
  };

  if (isLoading) {
    return <Spinner height="90vh" />;
  }

  return (
    <ProfileLayout title={LINKS.ADDRESS_BOOK.text}>
      <Box className={styles.container}>
        {addresses.data.length ? (
          addresses.data.map((address, id) => {
            return (
              <AddressCard
                key={id}
                address={address}
                handleOpenModal={handleOpenModal}
                setModalType={setModalType}
                setAddress={setAddress}
              />
            );
          })
        ) : (
          <Typography className={styles.title} variant="h4">
            There are no addresses
          </Typography>
        )}
        <Button
          onClick={handleAddButton}
          variant="contained"
          className={styles.button}
        >
          Add address
        </Button>
        <CreateOrEditAddressModal
          modalType={modalType}
          isOpenModal={isOpenModal}
          handleCloseModal={handleCloseModal}
          address={address}
          setAddress={setAddress}
        />
      </Box>
    </ProfileLayout>
  );
};

export default AddressBook;
