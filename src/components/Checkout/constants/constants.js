export const PANEL = {
  DELIVERY_ADDRESS: 'Delivery Address',
  PERSONAL_INFORMATION: 'Personal Information',
  PERSONAL_ADDRESS: 'Personal Address',
  PAYMENT_METHOD: 'Payment method',
  ORDER_CONFIRMATION: 'Order confirmation',
};

export const EXP_DATE_TEXT = {
  DEFAULT: 'Enter four digits MM/YY',
  MONTH_ERROR: 'Incorrect month',
  EXPIRED_ERROR: 'The card is expired',
};

export const EMPTY_PAYMENT_CARD = {
  cardNumber: { value: '', error: false },
  expDate: { value: '', error: false },
  cvv: { value: '', error: false },
  cardHolder: { value: '', error: false },
};
