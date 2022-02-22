import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { orderState } from '../../../../helpers/constants/orderStatus';
import { ordersDto } from '../../../../test-utils/dto/ordersDto';
import testProducts from '../../../../test-utils/dto/productsDto';
import renderWith from '../../../../test-utils/renderWith';
import { OrderButton } from '../OrderButton';

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

    return res(
      ctx.json({
        orderStatus: orderState.DELIVERED,
        orderId,
        deliveredAt: ordersDto[0].deliveredAt,
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
    return res(ctx.json({}), ctx.status(200));
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

describe('OrderCard component', () => {
  describe('snapshots for different order statuses', () => {
    beforeEach(() => {
      serverFulfilled.listen();
    });
    afterEach(() => {
      serverFulfilled.close();
    });

    it('Renders a valid orderCard snapshot with status WAITING_FOR_PAYMENT', () => {
      const { asFragment } = renderWith(
        <OrderButton
          className={''}
          orderIndex={1}
          status={orderState.WAITING_FOR_PAYMENT}
        />,
        {
          orders: {
            orders: ordersDto,
          },
          user: initialUser,
        }
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('Renders a valid orderCard snapshot with status PAID', () => {
      const { asFragment } = renderWith(
        <OrderButton className={''} orderIndex={1} status={orderState.PAID} />,
        {
          orders: {
            orders: ordersDto,
          },
          user: initialUser,
        }
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('Renders a valid orderCard snapshot with status DELIVERED', () => {
      const { asFragment } = renderWith(
        <OrderButton
          className={''}
          orderIndex={1}
          status={orderState.DELIVERED}
        />,
        {
          orders: {
            orders: ordersDto,
          },
          user: initialUser,
        }
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('Renders a valid orderCard snapshot with status CANCELLED', () => {
      const { asFragment } = renderWith(
        <OrderButton
          className={''}
          orderIndex={1}
          status={orderState.CANCELLED}
        />,
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
