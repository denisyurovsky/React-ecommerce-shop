import { Cart, CartDataRequest } from './../ts/models/cart.model';
import { http } from './setup';

const cartApi = {
  set(cart: CartDataRequest) {
    return http.put<Cart>(`/cart`, { cart });
  },
  delete() {
    return http.delete<void>(`/cart`);
  },
  calculateGuestPrice(cart: CartDataRequest) {
    return http.post<Cart>('/guest/cart', { cart });
  },
};

export default cartApi;
