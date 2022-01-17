import { orderState } from '../../helpers/constants/orderStatus';

export const ordersDto = [
  {
    userId: 0,
    id: 1,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 100,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 200,
      },
      {
        originalProductId: 3,
        categoryId: 10,
        price: 300,
      },
      {
        originalProductId: 4,
        categoryId: 10,
        price: 400,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 10,
    totalPrice: 10000,
    createdAt: '2021-04-19T08:46:13.911Z',
    deliveredAt: '2021-10-29T22:24:39.800Z',
  },
  {
    userId: 0,
    id: 2,
    products: [
      {
        originalProductId: 3,
        categoryId: 10,
        price: 500,
      },
      {
        originalProductId: 1,
        categoryId: 10,
        price: 150,
      },
      {
        originalProductId: 5,
        categoryId: 10,
        price: 34,
      },
    ],
    status: orderState.PAID,
    deliveryPrice: 30,
    totalPrice: 714,
    createdAt: '2021-01-19T08:46:13.911Z',
    deliveredAt: '2021-11-29T22:24:39.800Z',
  },
  {
    userId: 0,
    id: 3,
    products: [
      {
        originalProductId: 4,
        categoryId: 10,
        price: 264.5,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 264.5,
      },
    ],
    status: orderState.DELIVERED,
    deliveryPrice: 10,
    totalPrice: 539,
    createdAt: '2021-03-19T08:46:13.911Z',
    deliveredAt: '2021-07-29T22:24:39.800Z',
  },
  {
    userId: 0,
    id: 4,
    products: [
      {
        originalProductId: 0,
        categoryId: 10,
        price: 264.5,
      },
    ],
    status: 4,
    deliveryPrice: 10,
    totalPrice: 274.5,
    createdAt: '2022-09-19T08:46:13.911Z',
    deliveredAt: '2023-12-29T22:24:39.800Z',
  },
  {
    userId: 2,
    id: 5,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 100,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 200,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 10,
    totalPrice: 310,
    createdAt: '2021-04-19T08:46:13.911Z',
    deliveredAt: '2021-10-29T22:24:39.800Z',
  },
  {
    userId: 2,
    id: 6,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 100,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 200,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 10,
    totalPrice: 310,
    createdAt: '2021-04-19T08:46:13.911Z',
    deliveredAt: '2021-10-29T22:24:39.800Z',
  },
  {
    userId: 2,
    id: 7,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 10,
      },
      {
        originalProductId: 4,
        categoryId: 10,
        price: 20,
      },
      {
        originalProductId: 0,
        categoryId: 10,
        price: 30,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 40,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 11,
    totalPrice: 111,
    createdAt: '2021-04-19T08:46:13.911Z',
    deliveredAt: '2021-10-29T22:24:39.800Z',
  },
  {
    userId: 3,
    id: 8,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 100,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 200,
      },
    ],
    status: orderState.DELIVERED,
    deliveryPrice: 10,
    totalPrice: 310,
    createdAt: '2021-04-19T08:46:13.911Z',
    deliveredAt: '2021-10-29T22:24:39.800Z',
  },
  {
    userId: 3,
    id: 9,
    products: [
      {
        originalProductId: 0,
        categoryId: 10,
        price: 10,
      },
      {
        originalProductId: 1,
        categoryId: 10,
        price: 20,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 30,
      },
      {
        originalProductId: 3,
        categoryId: 10,
        price: 40,
      },
    ],
    status: orderState.CANCELLED,
    deliveryPrice: 11,
    totalPrice: 111,
    createdAt: '2021-04-19T08:46:13.911Z',
    deliveredAt: '2021-10-29T22:24:39.800Z',
  },
  {
    userId: 4,
    id: 10,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 100,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 200,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 10,
    totalPrice: 310,
    createdAt: '2021-04-19T08:46:13.911Z',
    deliveredAt: '2021-10-29T22:24:39.800Z',
  },
  {
    userId: 4,
    id: 11,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 10,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 20,
      },
      {
        originalProductId: 3,
        categoryId: 10,
        price: 30,
      },
      {
        originalProductId: 4,
        categoryId: 10,
        price: 40,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 11,
    totalPrice: 111,
    createdAt: '2021-04-19T08:46:13.911Z',
    deliveredAt: '2021-10-29T22:24:39.800Z',
  },
  {
    userId: 5,
    id: 12,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 100,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 200,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 10,
    totalPrice: 310,
    createdAt: '2021-04-19T08:46:13.911Z',
    deliveredAt: '2021-10-29T22:24:39.800Z',
  },
  {
    id: 13,
    userId: 5,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 10,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 20,
      },
      {
        originalProductId: 3,
        categoryId: 10,
        price: 30,
      },
      {
        originalProductId: 4,
        categoryId: 10,
        price: 40,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 11,
    totalPrice: 111,
    createdAt: '2021-03-19T08:46:13.911Z',
    deliveredAt: '2021-07-29T22:24:39.800Z',
  },
  {
    id: 14,
    userId: 5,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 100,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 200,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 10,
    totalPrice: 310,
    createdAt: '2021-08-19T08:46:13.911Z',
    deliveredAt: '2021-12-29T22:24:39.800Z',
  },
  {
    id: 15,
    userId: 5,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 450,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 280,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 10,
    totalPrice: 740,
    createdAt: '2021-01-19T08:46:13.911Z',
    deliveredAt: '2021-01-29T22:24:39.800Z',
  },
  {
    id: 16,
    userId: 5,
    products: [
      {
        originalProductId: 1,
        categoryId: 10,
        price: 1000,
      },
      {
        originalProductId: 2,
        categoryId: 10,
        price: 2000,
      },
    ],
    status: orderState.WAITING_FOR_PAYMENT,
    deliveryPrice: 10,
    totalPrice: 3010,
    createdAt: '2021-02-19T08:46:13.911Z',
    deliveredAt: '2021-02-29T22:24:39.800Z',
  },
];
