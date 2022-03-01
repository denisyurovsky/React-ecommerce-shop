import { shape, number, object, array } from 'prop-types';

const orderedProductsInfoType = shape({
  deliveryAddress: object.isRequired,
  products: array.isRequired,
  totalQuantity: number,
  totalPrice: number,
  totalDiscountPrice: number,
  addressId: number,
});

export default orderedProductsInfoType;
