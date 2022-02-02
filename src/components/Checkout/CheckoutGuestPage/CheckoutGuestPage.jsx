import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  EMPTY_ADDRESS,
  RUSSIA,
} from '../../../pages/AddressBookPage/constants/constants';
import orderedProductsInfoType from '../../../propTypes/orderedProductsInfoType';
import { getUser } from '../../../store/user/userSlice';
import { PANEL } from '../constants/constants';
import OrderConfirmationAccordion from '../OrderConfirmationAccordion/OrderConfirmationAccordion';
import PaymentMethodAccordion from '../PaymentMethodAccordion/PaymentMethodAccordion';
import PersonalAddressAccordion from '../PersonalAddressAccordion/PersonalAddressAccordion';
import PersonalInformationAccordion from '../PersonalInformationAccordion/PersonalInformationAccordion';

import styles from './CheckoutGuestPage.module.scss';

const CheckoutGuestPage = ({
  setCreatedOrderId,
  orderId,
  orderedProductsInfo,
}) => {
  const user = useSelector(getUser);
  const [isDeliveryAddressDisabled, setIsDeliveryAddressDisabled] =
    useState(true);
  const [isPaymentMethodDisabled, setIsPaymentMethodDisabled] = useState(true);
  const [isPersonalInformationValid, setIsPersonalInformationValid] =
    useState(null);
  const [isPersonalAddressValid, setIsPersonalAddressValid] = useState(null);
  const [expanded, setExpanded] = useState(PANEL.PERSONAL_INFORMATION);
  const [address, setAddress] = useState({
    ...EMPTY_ADDRESS,
    name: user.firstName,
    surname: user.lastName,
  });

  const {
    title,
    name,
    surname,
    country: { name: countryName },
    city,
    street,
    building,
    phone,
    zip,
  } = address;

  useEffect(() => {
    if (orderId && Object.keys(orderedProductsInfo.deliveryAddress).length) {
      setAddress(orderedProductsInfo.deliveryAddress);
      setExpanded(PANEL.PAYMENT_METHOD);
      setIsPaymentMethodDisabled(false);
      setIsDeliveryAddressDisabled(false);
    }
  }, [orderId, orderedProductsInfo.deliveryAddress]);

  useEffect(() => {
    setIsPersonalInformationValid(
      Boolean(title) && Boolean(name) && Boolean(surname) && phone.length === 16
    );
  }, [title, name, surname, phone]);

  useEffect(() => {
    const isZipValid = countryName === RUSSIA ? zip.length === 6 : Boolean(zip);

    const isPersonalAddressValid =
      Boolean(countryName) &&
      Boolean(city) &&
      Boolean(street) &&
      Boolean(building) &&
      isZipValid;

    setIsPersonalAddressValid(isPersonalAddressValid);
  }, [countryName, city, street, building, zip]);

  const handleChange = (e) => {
    const { id, name, value } = e.target;

    setAddress({
      ...address,
      [id || name]: value,
    });
  };

  const handleChangeAccordion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    if (
      panel === PANEL.PERSONAL_ADDRESS ||
      panel === PANEL.PERSONAL_INFORMATION
    ) {
      setIsPaymentMethodDisabled(true);
    }
  };

  const handlePersonalInformationButton = () => {
    setExpanded(PANEL.PERSONAL_ADDRESS);
    setIsDeliveryAddressDisabled(false);
  };

  return (
    <Box className={styles.container}>
      <PersonalInformationAccordion
        expanded={expanded}
        address={address}
        isPersonalInformationValid={isPersonalInformationValid}
        handleChangeAccordion={handleChangeAccordion}
        handlePersonalInformationButton={handlePersonalInformationButton}
        setAddress={setAddress}
        handleChange={handleChange}
        setIsDeliveryAddressDisabled={setIsDeliveryAddressDisabled}
      />
      <PersonalAddressAccordion
        expanded={expanded}
        setExpanded={setExpanded}
        handleChangeAccordion={handleChangeAccordion}
        address={address}
        isDeliveryAddressDisabled={isDeliveryAddressDisabled}
        setAddress={setAddress}
        handleChange={handleChange}
        isPersonalAddressValid={isPersonalAddressValid}
        isPersonalInformationValid={isPersonalInformationValid}
        setIsPaymentMethodDisabled={setIsPaymentMethodDisabled}
        setCreatedOrderId={setCreatedOrderId}
        orderId={orderId}
      />
      <PaymentMethodAccordion
        expanded={expanded}
        isDisabled={isPaymentMethodDisabled}
        handleChangeAccordion={handleChangeAccordion}
        orderedProductsInfo={orderedProductsInfo}
      />
      <OrderConfirmationAccordion
        expanded={expanded}
        handleChangeAccordion={handleChangeAccordion}
      />
    </Box>
  );
};

CheckoutGuestPage.propTypes = {
  setCreatedOrderId: PropTypes.func.isRequired,
  orderedProductsInfo: orderedProductsInfoType.isRequired,
  orderId: PropTypes.number,
};

export default CheckoutGuestPage;
