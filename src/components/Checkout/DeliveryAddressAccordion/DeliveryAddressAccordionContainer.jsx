import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import addressApi from '../../../api/addresses';
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
import { PANEL } from '../constants/constants';

import DeliveryAddressAccordion from './DeliveryAddressAccordion';

const DeliveryAddressAccordionContainer = ({
  setCreatedOrderId,
  setExpanded,
  expanded,
  handleChangeAddresses,
  addressId,
  handleEditButton,
  handleChangeAccordion,
  addresses,
  address,
  orderId,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const isDeliveryAddressExpended = expanded === PANEL.DELIVERY_ADDRESS;
  const [disabledAccordion, setDisabledAccordion] = useContext(CheckoutContext);

  const handleEditOrder = async () => {
    try {
      const addressResponse = await addressApi.get(addressId);

      dispatch(
        editAddressOrder({
          orderId,
          addressData: addressResponse.data,
          addressId,
        })
      );
    } catch (err) {
      toast.error(notificationError);
    }
  };

  const handleCreateOrder = async () => {
    try {
      const checkedProductIds = getSelectedProductIds(cart.sellers);
      const productsResponse = await productsApi.getProductsByIds(
        checkedProductIds
      );
      const addressResponse = await addressApi.get(addressId);

      const res = await dispatch(
        addOrder({
          productsData: productsResponse.data,
          addressData: addressResponse.data,
          addressId,
        })
      );

      setCreatedOrderId(res.payload.id);
      createBrowserHistory().push(`${pathNames.CHECKOUT}/${res.payload.id}`);

      dispatch(deleteSelectedProducts());
    } catch (err) {
      toast.error(notificationError);
    }
  };

  const handleDeliveryAddressButton = () => {
    setDisabledAccordion({ ...disabledAccordion, payment: false });
    setExpanded(PANEL.PAYMENT_METHOD);

    if (orderId) {
      handleEditOrder();
    } else {
      handleCreateOrder();
    }
  };

  return (
    <DeliveryAddressAccordion
      isDeliveryAddressExpended={isDeliveryAddressExpended}
      handleDeliveryAddressButton={handleDeliveryAddressButton}
      handleChangeAddresses={handleChangeAddresses}
      addressId={addressId}
      handleEditButton={handleEditButton}
      handleChangeAccordion={handleChangeAccordion}
      addresses={addresses}
      address={address}
    />
  );
};

DeliveryAddressAccordionContainer.propTypes = {
  setCreatedOrderId: PropTypes.func.isRequired,
  setExpanded: PropTypes.func.isRequired,
  handleChangeAddresses: PropTypes.func.isRequired,
  handleEditButton: PropTypes.func.isRequired,
  handleChangeAccordion: PropTypes.func.isRequired,
  addresses: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  orderId: PropTypes.number,
  addressId: PropTypes.number,
};

export default DeliveryAddressAccordionContainer;
