import { http } from './setup';

export const getUsersOrders = ({ userId }) => {
  return http.get(`/orders/?userId=${userId}&_sort=createdAt&_order=desc`);
};

export const getOrderById = (orderId) => {
  return http.get(`/orders/?id=${orderId}`);
};

export const addUsersOrders = (data) => {
  return http.post('/orders', data);
};

export const editUserAddressOrder = (orderId, deliveryAddress, addressId) => {
  return http.patch(`/orders/${orderId}`, { deliveryAddress, addressId });
};

export const cancelUsersOrder = ({ orderId, userId }) => {
  return http.post(`/cancel-order`, { orderId, userId });
};

export const confirmUsersOrder = ({ orderId, userId }) => {
  return http.post(`/confirm-order`, { orderId, userId });
};
