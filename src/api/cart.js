import { http } from './setup';

export const setCart = (cart) => http.put(`/cart`, { cart });

export const deleteCart = () => http.delete(`/cart`);

export const calculateGuestPrice = (cart) => http.post('/guest/cart', { cart });
