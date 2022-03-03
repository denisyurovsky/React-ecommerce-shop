import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { orderState } from '../../../../constants/orderStatus';
import { ordersDto } from '../../../../test-utils/dto/ordersDto';
import testProducts from '../../../../test-utils/dto/productsDto';
import renderWith from '../../../../test-utils/renderWith';
import { OrderCard } from '../OrderCard';

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

describe('OrderCard component', () => {
  describe('snapshots for different order statuses', () => {
    beforeEach(() => {
      serverFulfilled.listen();
    });
    afterEach(() => {
      serverFulfilled.close();
    });

    it('Renders a valid orderCard snapshot with status equal 1', () => {
      const { asFragment } = renderWith(
        <OrderCard orderId={ordersDto[0].id} />,
        {
          orders: {
            orders: ordersDto,
          },
          user: initialUser,
        }
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('Renders a valid orderCard snapshot with status equal 2', () => {
      const { asFragment } = renderWith(
        <OrderCard orderId={ordersDto[1].id} />,
        {
          orders: {
            orders: ordersDto,
          },
          user: initialUser,
        }
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('Renders a valid orderCard snapshot with status equal 3', () => {
      const { asFragment } = renderWith(
        <OrderCard orderId={ordersDto[2].id} />,
        {
          orders: {
            orders: ordersDto,
          },
          user: initialUser,
        }
      );

      expect(asFragment()).toMatchSnapshot();
    });
    it('Renders a valid orderCard snapshot with status equal 4', () => {
      const { asFragment } = renderWith(
        <OrderCard orderId={ordersDto[3].id} />,
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

  describe('reacts on cancel click correct', () => {
    beforeEach(() => {
      serverFulfilled.listen();
    });

    afterEach(() => {
      serverFulfilled.close();
    });
    it('reacts on click with status  waiting for payment', async () => {
      renderWith(<OrderCard orderId={ordersDto[0].id} />, {
        orders: {
          orders: ordersDto,
        },
        user: initialUser,
      });

      expect(screen.getByText('Waiting for payment')).toBeInTheDocument();

      const expandButton = screen.getByTestId('ExpandMoreIcon');

      userEvent.click(expandButton);

      const cancelButtons = await screen.findAllByText('Cancel order');

      userEvent.click(cancelButtons[0]);

      const cancelledMark = await screen.findByText('Cancelled');

      expect(cancelledMark).toBeInTheDocument();
    });
  });
});
