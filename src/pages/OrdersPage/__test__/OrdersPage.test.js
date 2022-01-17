import { fireEvent, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { orderState } from '../../../helpers/constants/orderStatus';
import { ordersDto } from '../../../test-utils/dto/ordersDto';
import testProducts from '../../../test-utils/dto/productsDto';
import renderWith from '../../../test-utils/renderWith';
import { OrdersPage } from '../OrdersPage';

const initialUser = {
  user: {
    id: 0,
  },
};

const usersOrders = ordersDto.filter(
  (order) => order.userId === initialUser.user.id
);

let serverUser = {
  id: 0,
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

    return res(ctx.json(usersOrders), ctx.status(200));
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

describe('OrdersPage component', () => {
  describe('snapshots', () => {
    it('renders OrdersPage without data', async () => {
      const { asFragment } = renderWith(<OrdersPage />, {
        orders: {
          isLoading: false,
          errorOccurred: false,
          orders: [],
        },
        user: initialUser,
      });

      await waitFor(async () => {
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });

  describe('Rects on button clicks correct', () => {
    beforeEach(() => {
      serverFulfilled.listen();
    });

    afterEach(() => {
      serverFulfilled.close();
    });

    it('Cancels order on click and allows to filter orders', async () => {
      const firstRender = renderWith(<OrdersPage />, {
        orders: {
          isLoading: false,
          errorOccurred: false,
          orders: usersOrders,
        },
        user: initialUser,
      });

      const waitingForDeliveryMark = await firstRender.findByText(
        'Waiting for delivery'
      );
      const waitingForPaymentMark = await firstRender.findByText(
        'Waiting for payment'
      );
      const cancelledMark = await firstRender.findByText('Cancelled');

      const deliveredMark = await firstRender.findByText('Delivered');

      expect(waitingForDeliveryMark).toBeInTheDocument();
      expect(waitingForPaymentMark).toBeInTheDocument();
      expect(cancelledMark).toBeInTheDocument();
      expect(deliveredMark).toBeInTheDocument();

      const expandButtons = await screen.findAllByTestId('ExpandMoreIcon');

      expect(expandButtons.length).toBe(4);

      fireEvent.click(expandButtons[0]);

      const cancelButtons = await screen.findAllByText('Cancel order');

      fireEvent.click(cancelButtons[0]);

      let newCancelledButton = screen.queryByText('Cancel order');

      await waitFor(() => {
        expect(newCancelledButton).toEqual(null);
      });

      let newCancelledMarks = await screen.findAllByText('Cancelled');

      await waitFor(() => {
        expect(newCancelledMarks.length).toEqual(2);
      });

      fireEvent.click(expandButtons[0]);

      const filterButton = await screen.findByText('All');

      fireEvent.mouseDown(filterButton);

      newCancelledMarks = await screen.findAllByText('Cancelled');
      await waitFor(async () => {
        expect(newCancelledMarks.length).toBe(3);
      });

      fireEvent.click(newCancelledMarks[2]);
      const newExpandButtons = await screen.findAllByTestId('ExpandMoreIcon');

      await waitFor(async () => {
        expect(newExpandButtons.length).toEqual(2);
      });

      fireEvent.mouseDown(filterButton);
      const selectAllOption = await screen.findByText('All');

      await waitFor(async () => {
        expect(selectAllOption).toBeInTheDocument();
      });

      fireEvent.click(selectAllOption);
      const allExpandButtons = await screen.findAllByTestId('ExpandMoreIcon');

      await waitFor(async () => {
        expect(allExpandButtons.length).toEqual(4);
      });
    }, 10000);
  });
});
