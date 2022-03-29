import { Payment } from './../ts/models/payment.model';
import { http } from './setup';

const paymentApi = {
  send(paymentData: Payment) {
    return http.post<Payment>('/payment', paymentData);
  },
};

export default paymentApi;
