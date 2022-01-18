import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { MODAL_TYPE } from '../../../pages/AddressBookPage/constants/constants';
import addressType from '../../../propTypes/addressType';

import styles from './AddressCard.module.scss';

const AddressCard = ({
  address,
  handleOpenModal,
  setModalType,
  setAddress,
}) => {
  const {
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

  return (
    <Card className={styles.card}>
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
