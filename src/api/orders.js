import { http } from './setup';

export const getUsersOrders = async ({ userId }) => {
  return http.get(`/orders/?userId=${userId}&_sort=createdAt&_order=desc`);
};

export const cancelUsersOrder = async ({ orderId, userId }) => {
  return http.post(`/cancel-order`, { orderId, userId });
};

export const confirmUsersOrder = async ({ orderId, userId }) => {
  return http.post(`/confirm-order`, { orderId, userId });
};
