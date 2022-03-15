import React, { useState } from 'react';

import { PANEL } from '../../components/Checkout/constants/constants';
import OrderConfirmation from '../../components/Checkout/OrderConfirmationAccordion/OrderConfirmationAccordion';
import PaymentMethod from '../../components/Checkout/PaymentMethodAccordion/PaymentMethodAccordion';
import { CheckoutContext } from '../../pages/CheckoutPage/CheckoutPage';

const PaymentWrapper = () => {
  const [expanded, setExpanded] = useState(PANEL.PAYMENT_METHOD);
  const handleChangeAccordion = () => {};
  const [disabledAccordion, setDisabledAccordion] = useState({
    payment: false,
    confirmation: true,
  });

  return (
    <CheckoutContext.Provider value={[disabledAccordion, setDisabledAccordion]}>
      <PaymentMethod
        expanded={expanded}
        setExpanded={setExpanded}
        handleChangeAccordion={handleChangeAccordion}
        orderedProductsInfo={{ totalPrice: 150 }}
        orderId={0}
      />
      <OrderConfirmation
        expanded={expanded}
        handleChangeAccordion={handleChangeAccordion}
      />
    </CheckoutContext.Provider>
  );
};

export default PaymentWrapper;
