import { OrderStatus } from '../enums/enums';

import { OrderAddress } from './addresses.model';

interface OrderProduct {
  originalProductId: number;
  name: string;
  images: string[];
  price: number;
  discountPrice: number | null;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number | null;
  addressId: number | null;
  status: OrderStatus;
  products: OrderProduct[];
  deliveryAddress: OrderAddress;
  deliveryPrice: number;
  totalPrice: number;
  totalDiscountPrice: number;
  totalQuantity: number;
  createdAt: string;
  updatedAt: string;
  deliveredAt: string | null;
}
