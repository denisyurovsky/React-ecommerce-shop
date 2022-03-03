export const orderState = {
  WAITING_FOR_PAYMENT: 1,
  PAID: 2,
  DELIVERED: 3,
  CANCELLED: 4,
};

export const orderStatus = {
  [orderState.WAITING_FOR_PAYMENT]: {
    paymentStatus: 'Waiting for payment',
    deliveryStatus: 'Waiting for payment',
  },
  [orderState.PAID]: {
    paymentStatus: 'Paid',
    deliveryStatus: 'Waiting for delivery',
  },
  [orderState.DELIVERED]: {
    paymentStatus: 'Paid',
    deliveryStatus: 'Delivered',
  },
  [orderState.CANCELLED]: {
    paymentStatus: 'Cancelled',
    deliveryStatus: 'Cancelled',
  },
};
