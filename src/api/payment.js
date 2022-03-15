import { http } from './setup';

export const sendPayment = (paymentData) => {
  return http.post('/payment', paymentData);
};
