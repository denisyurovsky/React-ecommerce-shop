import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  EMPTY_ADDRESS,
  MODAL_TYPE,
} from '../../../pages/AddressBookPage/constants/constants';
import orderedProductsInfoType from '../../../propTypes/orderedProductsInfoType';
import {
  getAddressesByIds,
  selectAddresses,
} from '../../../store/addresses/addressesSlice';
import { getUser } from '../../../store/user/userSlice';
import CreateOrEditAddressModal from '../../AddressBook/CreateOrEditAddressModal/CreateOrEditAddressModal';
import { PANEL } from '../constants/constants';
import DeliveryAddressAccordionContainer from '../DeliveryAddressAccordion/DeliveryAddressAccordionContainer';
import OrderConfirmationAccordion from '../OrderConfirmationAccordion/OrderConfirmationAccordion';
import PaymentMethodAccordion from '../PaymentMethodAccordion/PaymentMethodAccordion';

import styles from './CheckoutUserPage.module.scss';

const CheckoutUserPage = ({
  setCreatedOrderId,
  orderId,
  orderedProductsInfo,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const addresses = useSelector(selectAddresses);
  const addressIds = user.addresses;

  useEffect(() => {
    dispatch(getAddressesByIds(addressIds));
  }, [addressIds, dispatch]);

  useEffect(() => {
    if (orderId) {
      setIsPaymentMethodAccordionDisabled(false);
      setExpanded(PANEL.PAYMENT_METHOD);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderedProductsInfo.addressId && addresses.data) {
      handleChangeAddresses(orderedProductsInfo.addressId);
    }
  }, [orderedProductsInfo.addressId, addresses.data]); // eslint-disable-line

  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [expanded, setExpanded] = useState(PANEL.DELIVERY_ADDRESS);
  const [addressId, setAddressId] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [
    isPaymentMethodAccordionDisabled,
    setIsPaymentMethodAccordionDisabled,
  ] = useState(true);

  const handleCloseModal = () => setIsOpenModal(false);

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    if (panel === PANEL.DELIVERY_ADDRESS) {
      setIsPaymentMethodAccordionDisabled(true);
    }
  };

  const handleChangeAddresses = (e) => {
    const value = e.target?.value ?? e;

    setAddressId(value);
    const selectedAddress = addresses.data.find(
      ({ id }) => id === Number(value)
    );

    if (selectedAddress) {
      setAddress(selectedAddress);
    }
  };

  const handleEditButton = () => {
    setIsOpenModal(true);
    setAddress(address);
  };

  return (
    <Box className={styles.container}>
      <Box>
        <DeliveryAddressAccordionContainer
          setCreatedOrderId={setCreatedOrderId}
          addressId={addressId}
          expanded={expanded}
          addresses={addresses}
          address={address}
          setExpanded={setExpanded}
          handleChangeAddresses={handleChangeAddresses}
          handleEditButton={handleEditButton}
          handleChangeAccordion={handleChangeAccordion}
          setIsPaymentMethodAccordionDisabled={
            setIsPaymentMethodAccordionDisabled
          }
          orderId={orderId}
        />
        <PaymentMethodAccordion
          expanded={expanded}
          isDisabled={isPaymentMethodAccordionDisabled}
          handleChangeAccordion={handleChangeAccordion}
          orderedProductsInfo={orderedProductsInfo}
        />
        <OrderConfirmationAccordion
          expanded={expanded}
          handleChangeAccordion={handleChangeAccordion}
        />
      </Box>
      <CreateOrEditAddressModal
        modalType={MODAL_TYPE.EDIT}
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        address={address}
        setAddress={setAddress}
      />
    </Box>
  );
};

CheckoutUserPage.propTypes = {
  orderedProductsInfo: orderedProductsInfoType.isRequired,
  setCreatedOrderId: PropTypes.func.isRequired,
  orderId: PropTypes.number,
};

export default CheckoutUserPage;
