import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal, Typography, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { REQUEST_STATUS, SUCCESS } from '../../../helpers/constants/constants';
import {
  MODAL_TYPE,
  RUSSIA,
} from '../../../pages/AddressBookPage/constants/constants';
import addressType from '../../../propTypes/addressType';
import {
  addAddress,
  editAddress,
} from '../../../store/addresses/addressesSlice';
import { getUser } from '../../../store/user/userSlice';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import PersonalInformation from '../PersonalInformation/PersonalInformation';

import styles from './CreateOrEditAddressModal.module.scss';

const CreateOrEditAddressModal = ({
  modalType,
  isOpenModal,
  handleCloseModal,
  setAddress,
  address,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [isDisabled, setIsDisabled] = useState(true);
  const isZipLengthValid =
    address.country.name === RUSSIA ? address.zip.length === 6 : true;

  useEffect(() => {
    const isDisabled = !(
      address.title &&
      address.name &&
      address.surname &&
      address.country.name &&
      address.city &&
      address.street &&
      address.building &&
      address.phone.length === 16 &&
      address.zip &&
      isZipLengthValid
    );

    setIsDisabled(isDisabled);
  }, [address, isZipLengthValid]);

  const handleChange = (e) => {
    const { id, name, value } = e.target;

    setAddress({
      ...address,
      [id || name]: value,
    });
  };

  const handleAdd = () => {
    dispatch(addAddress({ address, user })).then((res) => {
      if (res.meta.requestStatus === REQUEST_STATUS.FULFILLED) {
        toast.success(SUCCESS.ADDRESS_ADDED);
        handleCloseModal();
      }
    });
  };

  const handleEdit = () => {
    dispatch(editAddress(address)).then((res) => {
      if (res.meta.requestStatus === REQUEST_STATUS.FULFILLED) {
        toast.success(SUCCESS.ADDRESS_EDITED);
        handleCloseModal();
      }
    });
  };

  return (
    <Modal
      className={styles.container}
      open={isOpenModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" className={styles.modal}>
        <IconButton
          className={styles.cross}
          color="primary"
          onClick={handleCloseModal}
          size="small"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" className={styles.title}>
          {modalType === MODAL_TYPE.ADD ? 'Add address' : 'Edit address'}
        </Typography>
        <PersonalInformation
          handleChange={handleChange}
          setAddress={setAddress}
          address={address}
        />
        <DeliveryAddress
          handleChange={handleChange}
          setAddress={setAddress}
          address={address}
        />
        <Button
          role="button"
          onClick={modalType === MODAL_TYPE.ADD ? handleAdd : handleEdit}
          variant="contained"
          className={styles.button}
          disabled={isDisabled}
        >
          {modalType === MODAL_TYPE.ADD ? 'add' : 'save'}
        </Button>
      </Box>
    </Modal>
  );
};

CreateOrEditAddressModal.propTypes = {
  modalType: PropTypes.oneOf([MODAL_TYPE.ADD, MODAL_TYPE.EDIT]).isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  address: addressType.isRequired,
};

export default CreateOrEditAddressModal;
