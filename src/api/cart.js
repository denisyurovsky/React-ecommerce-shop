import { http } from './setup';

export const setCart = ({ userId, cart }) => {
  return http.put(`/cart/${userId}`, { ...cart, userId: userId });
};
