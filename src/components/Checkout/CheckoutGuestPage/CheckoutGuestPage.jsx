import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';

import {
  EMPTY_ADDRESS,
  RUSSIA,
} from '../../../pages/AddressBookPage/constants/constants';
import { CheckoutContext } from '../../../pages/CheckoutPage/CheckoutPage';
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
  const [isPersonalInformationValid, setIsPersonalInformationValid] =
    useState(null);
  const [isPersonalAddressValid, setIsPersonalAddressValid] = useState(null);
  const [expanded, setExpanded] = useState(PANEL.PERSONAL_INFORMATION);
  const [address, setAddress] = useState({
    ...EMPTY_ADDRESS,
    name: user.firstName,
    surname: user.lastName,
  });
  const [disabledAccordion, setDisabledAccordion] = useContext(CheckoutContext);

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
      setDisabledAccordion({
        info: true,
        address: false,
        payment: false,
        cofirmation: true,
      });
    }
  }, [orderId, orderedProductsInfo.deliveryAddress, setDisabledAccordion]);

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
      setDisabledAccordion({ ...disabledAccordion, payment: true });
    }
  };

  const handlePersonalInformationButton = () => {
    setExpanded(PANEL.PERSONAL_ADDRESS);
    setDisabledAccordion({ ...disabledAccordion, address: false });
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
      />
      <PersonalAddressAccordion
        expanded={expanded}
        setExpanded={setExpanded}
        handleChangeAccordion={handleChangeAccordion}
        address={address}
        setAddress={setAddress}
        handleChange={handleChange}
        isPersonalAddressValid={isPersonalAddressValid}
        isPersonalInformationValid={isPersonalInformationValid}
        setCreatedOrderId={setCreatedOrderId}
        orderId={orderId}
      />
      <PaymentMethodAccordion
        expanded={expanded}
        setExpanded={setExpanded}
        handleChangeAccordion={handleChangeAccordion}
        orderedProductsInfo={orderedProductsInfo}
        orderId={orderId}
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
