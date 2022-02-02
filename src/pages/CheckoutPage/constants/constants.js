import { pathNames } from '../../../constants/pathNames';

export const LINKS = [
  { url: '/', text: 'Home' },
  {
    url: pathNames.CHECKOUT,
    text: 'Checkout',
  },
];

export const EMPTY_ORDER = {
  userId: null,
  id: null,
  products: [],
  status: null,
  addressId: null,
  deliveryAddress: {},
  deliveryPrice: null,
  totalPrice: null,
  totalDiscountPrice: null,
  totalQuantity: null,
  deliveredAt: null,
  createdAt: null,
  updatedAt: null,
};
