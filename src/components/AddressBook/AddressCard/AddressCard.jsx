import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { deleteAddress } from '../../../api/addresses';
import { notificationError } from '../../../constants/constants';
import {
  MODAL_TYPE,
  successNotification,
} from '../../../pages/AddressBookPage/constants/constants';
import addressType from '../../../propTypes/addressType';
import { getAddressesByIds } from '../../../store/addresses/addressesSlice';
import Modal from '../../ui-kit/Modal/Modal';

import styles from './AddressCard.module.scss';

const AddressCard = ({
  address,
  handleOpenModal,
  setModalType,
  setAddress,
}) => {
  const {
    id,
    title,
    name,
    surname,
    country,
    city,
    street,
    building,
    flat,
    phone,
    zip,
  } = address;

  const handleEditButton = () => {
    handleOpenModal();
    setModalType(MODAL_TYPE.EDIT);
    setAddress(address);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let addressIds = user.user.addresses;

  const onDeleteAddress = async () => {
    try {
      const response = await deleteAddress(id);

      if (response.status === 200) {
        dispatch(getAddressesByIds(addressIds));
        toast.success(successNotification);
      }
    } catch (e) {
      toast.error(notificationError);
    }
  };

  const [modal, setModal] = useState(false);

  const onOpenModal = () => {
    setModal(!modal);
  };

  return (
    <Card className={styles.card}>
      <CloseIcon onClick={onOpenModal} className={styles.closeIcon} />
      <Modal
        onConfirm={onDeleteAddress}
        cancelButtonLabel={'No'}
        actionButtonLabel={'Yes'}
        isOpen={modal}
        onClose={onOpenModal}
      >
        <DialogTitle>
          Are you sure you want to delete the current address?
        </DialogTitle>
      </Modal>
      <CardContent>
        <Typography variant="body1">
          {title} {name} {surname}
        </Typography>
        <Typography variant="body1">{phone}</Typography>
        <br />
        <Typography variant="body1">
          {country.name}, {city}
        </Typography>
        <Typography variant="body1">
          {street}, {building}, {flat}
        </Typography>
        <br />
        <Typography variant="body1">{zip}</Typography>
      </CardContent>
      <CardActions className={styles.footer}>
        <Button onClick={handleEditButton} variant="contained">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

AddressCard.propTypes = {
  setAddress: PropTypes.func.isRequired,
  setModalType: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  address: addressType.isRequired,
};

export default AddressCard;
