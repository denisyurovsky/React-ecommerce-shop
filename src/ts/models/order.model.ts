import { OrderStatus } from '../enums/enums';

import { OrderAddress } from './addresses.model';

export interface OrderActionPayload {
  orderId: number;
  userId: number;
}

export interface OrderConfirm extends OrderActionPayload {
  deliveredAt: Date;
}

interface OrderProduct {
  originalProductId: number;
  name: string;
  images: string[];
  price: number;
  discountPrice: number | null;
  quantity: number;
}

export interface OrderPayload {
  userId: number | null;
  addressId: number | null;
  status: OrderStatus;
  products: OrderProduct[];
  deliveryAddress: OrderAddress;
  deliveryPrice: number;
  totalPrice: number;
  totalDiscountPrice: number;
  totalQuantity: number;
  deliveredAt: string | null;
}

export interface Order extends OrderPayload {
  id: number;
  createdAt: string;
  updatedAt: string;
}
