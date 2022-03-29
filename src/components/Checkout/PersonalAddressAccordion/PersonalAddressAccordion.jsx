import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
  Accordion,
  AccordionDetails,
  Box,
  Typography,
  Button,
} from '@mui/material';
import classNames from 'classnames';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import productsApi from '../../../api/products';
import { notificationError } from '../../../constants/constants';
import { pathNames } from '../../../constants/pathNames';
import getSelectedProductIds from '../../../helpers/getSelectedProductIds';
import { CheckoutContext } from '../../../pages/CheckoutPage/CheckoutPage';
import {
  deleteSelectedProducts,
  selectCart,
} from '../../../store/cart/cartSlice';
import { addOrder, editAddressOrder } from '../../../store/orders/ordersSlice';
import DeliveryAddress from '../../AddressBook/DeliveryAddress/DeliveryAddress';
import { PANEL } from '../constants/constants';
import AccordionSummary from '../helpers/AccordionSummary';

import styles from './PersonalAddressAccordion.module.scss';

const PersonalAddressAccordion = ({
  expanded,
  handleChangeAccordion,
  address,
  setAddress,
  handleChange,
  isPersonalAddressValid,
  isPersonalInformationValid,
  setExpanded,
  setCreatedOrderId,
  orderId,
}) => {
  const {
    country: { name: countryName },
    city,
    street,
    building,
    zip,
  } = address;
  const isPersonalAddressExpended = expanded === PANEL.PERSONAL_ADDRESS;
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const [disabledAccordion, setDisabledAccordion] = useContext(CheckoutContext);

  const handlePersonalAddressButton = async () => {
    setExpanded(PANEL.PAYMENT_METHOD);
    setDisabledAccordion({ ...disabledAccordion, payment: false });

    if (orderId) {
      try {
        dispatch(
          editAddressOrder({ orderId, addressData: address, addressId: null })
        );
      } catch (err) {
        toast.error(notificationError);
      }
    } else {
      try {
        const checkedProductIds = getSelectedProductIds(cart.sellers);
        const productsResponse = await productsApi.getProductsByIds(
          checkedProductIds
        );
        const res = await dispatch(
          addOrder({
            productsData: productsResponse.data,
            addressData: address,
            addressId: null,
          })
        );

        setCreatedOrderId(res.payload.id);
        createBrowserHistory().push(`${pathNames.CHECKOUT}/${res.payload.id}`);
        dispatch(deleteSelectedProducts());
      } catch (err) {
        toast.error(notificationError);
      }
    }
  };

  return (
    <Accordion
      disabled={disabledAccordion.address}
      className={classNames({
        [styles.accordionSummary]: !isPersonalAddressExpended,
        [styles.accordion]: true,
      })}
      expanded={isPersonalAddressExpended}
      onChange={handleChangeAccordion(PANEL.PERSONAL_ADDRESS)}
    >
      <AccordionSummary
        expandIcon={
          isPersonalAddressValid &&
          isPersonalInformationValid &&
          !isPersonalAddressExpended ? (
            <EditIcon />
          ) : (
            <ArrowDropDownIcon />
          )
        }
        data-testid="personalAddressSummery"
      >
        <Box className={styles.header}>
          <LocalShippingIcon className={styles.icon} />
          <Box>
            <Typography className={styles.subtitle} variant="subtitle2">
              Delivery address
            </Typography>
            {!isPersonalAddressExpended && isPersonalAddressValid && (
              <Box className={styles.body}>
                <Typography variant="caption">
                  {countryName}, {city}
                </Typography>
                <Typography variant="caption" data-testid="address">
                  {street}, {building}
                </Typography>
                <Typography variant="caption">{zip}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <DeliveryAddress
          handleChange={handleChange}
          address={address}
          setAddress={setAddress}
        />
        <Button
          fullWidth
          onClick={handlePersonalAddressButton}
          className={styles.button}
          variant="contained"
          disabled={!isPersonalAddressValid || !isPersonalInformationValid}
          data-testid="personalAddressButton"
        >
          Proceed
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

PersonalAddressAccordion.propTypes = {
  handleChangeAccordion: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  setAddress: PropTypes.func.isRequired,
  setCreatedOrderId: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setExpanded: PropTypes.func.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  orderId: PropTypes.number,
  isPersonalInformationValid: PropTypes.bool,
  isPersonalAddressValid: PropTypes.bool,
};

export default PersonalAddressAccordion;
