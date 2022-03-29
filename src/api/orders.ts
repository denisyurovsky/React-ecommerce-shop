import { OrderAddress } from './../ts/models/addresses.model';
import {
  OrderPayload,
  OrderConfirm,
  OrderActionPayload,
} from './../ts/models/order.model';
import { http } from './setup';
import { Order } from './user';

const ordersApi = {
  getUsersOrders(userId: number) {
    return http.get<Order[]>(
      `/orders/?userId=${userId}&_sort=createdAt&_order=desc`
    );
  },
  getOrderById(orderId: number) {
    return http.get<Order>(`/orders/?id=${orderId}`);
  },
  addUserOrder(data: OrderPayload) {
    return http.post<Order>('/orders', data);
  },
  editUserAddressOrder(
    orderId: number,
    deliveryAddress: OrderAddress,
    addressId: number | null
  ) {
    return http.patch<Order>(`/orders/${orderId}`, {
      deliveryAddress,
      addressId,
    });
  },
  cancelUsersOrder({ orderId, userId }: OrderActionPayload) {
    return http.post<OrderActionPayload>(`/cancel-order`, { orderId, userId });
  },
  confirmUsersOrder({ orderId, userId }: OrderActionPayload) {
    return http.post<OrderConfirm>(`/confirm-order`, { orderId, userId });
  },
};

export default ordersApi;
