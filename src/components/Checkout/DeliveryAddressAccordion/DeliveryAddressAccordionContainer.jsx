import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getAddressById } from '../../../api/addresses';
import { getProductsByIds } from '../../../api/products';
import { notificationError } from '../../../constants/constants';
import { pathNames } from '../../../constants/pathNames';
import getSelectedProductIds from '../../../helpers/getSelectedProductIds';
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
  setIsPaymentMethodAccordionDisabled,
  orderId,
}) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const isDeliveryAddressExpended = expanded === PANEL.DELIVERY_ADDRESS;

  const handleEditOrder = async () => {
    try {
      const addressResponse = await getAddressById(addressId);

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
      const productsResponse = await getProductsByIds(checkedProductIds);
      const addressResponse = await getAddressById(addressId);

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
    setIsPaymentMethodAccordionDisabled(false);
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
  setIsPaymentMethodAccordionDisabled: PropTypes.func.isRequired,
  addresses: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  orderId: PropTypes.number,
  addressId: PropTypes.number,
};

export default DeliveryAddressAccordionContainer;
