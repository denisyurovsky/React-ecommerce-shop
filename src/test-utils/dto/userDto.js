import { testCart } from './cartDto';

export const userDto = {
  email: 'IvanIvanov@yandex.ru',
  firstName: 'Ivan',
  lastName: 'Ivanov',
  cart: testCart,
  id: 1,
};

export const userWithEmptyCart = {
  name: 'name',
  id: 1,
  email: 'email@email.com',
  cart: {
    sellers: {},
    totalQuantity: 0,
    totalPrice: 0,
  },
};
