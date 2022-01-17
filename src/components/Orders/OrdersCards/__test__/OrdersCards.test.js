import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { orderState } from '../../../../helpers/constants/orderStatus';
import { ordersDto } from '../../../../test-utils/dto/ordersDto';
import testProducts from '../../../../test-utils/dto/productsDto';
import renderWith from '../../../../test-utils/renderWith';
import { OrdersCards } from '../OrdersCards';

const initialUser = {
  user: {
    id: 1,
    orders: ordersDto,
  },
};

let serverUser = {
  id: 1,
  orders: ordersDto,
  isLoading: false,
  errorOccurred: false,
};

const handlersFulfilled = [
  rest.post('/confirm-order', (req, res, ctx) => {
    const { orderId } = req.body;

    const now = new Date();

    return res(
      ctx.json({
        orderStatus: orderState.DELIVERED,
        orderId,
        deliveredAt: now,
      }),
      ctx.status(200)
    );
  }),
  rest.post('/cancel-order', (req, res, ctx) => {
    const { orderId } = req.body;

    return res(
      ctx.json({ orderId, orderStatus: orderState.CANCELLED }),
      ctx.status(200)
    );
  }),
  rest.get('/orders', (req, res, ctx) => {
    const { userId } = req.body;

    const response = [];

    ordersDto.forEach((order) => {
      if (order.userId === userId) {
        response.push(order);
      }
    });

    return res(ctx.json(response), ctx.status(200));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.json(serverUser), ctx.status(200));
  }),
  rest.get('/users/:userId', (req, res, ctx) => {
    return res(ctx.json(serverUser), ctx.status(200));
  }),
  rest.get('/products/', (req, res, ctx) => {
    const response = [];

    if (req.url.searchParams) {
      req.url.searchParams.forEach((item) => {
        response.push(testProducts[item]);
      });
    }

    return res(ctx.json(response), ctx.status(200));
  }),
];

const serverFulfilled = setupServer(...handlersFulfilled);

describe('OrdersCards component', () => {
  describe('snapshots with orders and without orders', () => {
    beforeEach(() => {
      serverFulfilled.listen();
    });
    afterEach(() => {
      serverFulfilled.close();
    });

    it('Renders a valid orderCard snapshot without orders', () => {
      const { asFragment } = renderWith(<OrdersCards displayedOrders={[]} />, {
        orders: {
          orders: ordersDto,
        },
        user: initialUser,
      });

      expect(asFragment()).toMatchSnapshot();
    });

    it('Renders a valid orderCard snapshot with orders', () => {
      const { asFragment } = renderWith(
        <OrdersCards displayedOrders={ordersDto} />,
        {
          orders: {
            orders: ordersDto,
          },
          user: initialUser,
        }
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
