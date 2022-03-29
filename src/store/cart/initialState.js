import { testCart } from '../../test-utils/dto/cartDto';

export const testInitialState = testCart;

export const initialState = {
  sellers: {},
  totalPrice: 0,
  totalDiscountPrice: 0,
  totalQuantity: 0,
  sellersDiscount: 0,
  personalDiscount: 0,
  isLoading: false,
  errorOccurred: false,
  errorMessage: '',
};
