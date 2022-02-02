import { shape, string, number, object, array } from 'prop-types';

const orderedProductsInfoType = shape({
  deliveryAddress: object.isRequired,
  products: array.isRequired,
  totalQuantity: number,
  totalPrice: number,
  totalDiscountPrice: number,
  addressId: string,
});

export default orderedProductsInfoType;
