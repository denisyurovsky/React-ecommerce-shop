import { configureStore } from '@reduxjs/toolkit';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { orderState } from '../../../helpers/constants/orderStatus';
import { ordersDto } from '../../../test-utils/dto/ordersDto';
import userReducer from '../../user/userSlice';
import ordersReducer, {
  cancelOrder,
  confirmOrder,
  getOrders,
} from '../ordersSlice';

const initialUser = {
  user: {
    id: 0,
  },
};

const initialOrders = {
  orders: [],
  errorMessage: '',
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
  rest.get(`/orders`, (req, res, ctx) => {
    const userId = initialUser.user.id;

    const response = [];

    ordersDto.forEach((order) => {
      if (order.userId === userId) {
        response.push(order);
      }
    });

    return res(ctx.json(response), ctx.status(200));
  }),
];

const errorHandlers = [
  rest.post('/confirm-order', (req, res, ctx) => {
    return res(ctx.json({}), ctx.status(404));
  }),
  rest.post('/cancel-order', (req, res, ctx) => {
    return res(ctx.json({}), ctx.status(404));
  }),
  rest.get(`/orders`, (req, res, ctx) => {
    return res(ctx.json({}), ctx.status(404));
  }),
];

const store = configureStore({
  reducer: {
    user: userReducer,
    orders: ordersReducer,
  },
  preloadedState: {
    user: initialUser,
    orders: initialOrders,
  },
});

const serverFulfilled = setupServer(...handlersFulfilled);

describe('Cart actions', () => {
  describe('Correct server response', () => {
    beforeAll(() => serverFulfilled.listen());
    afterAll(() => serverFulfilled.close());
    it('Should be able to get orders', async () => {
      expect(store.getState().orders.orders.length).toEqual(0);
      await store.dispatch(getOrders());
      await waitFor(async () => {
        expect(store.getState().orders.orders.length).toBe(4);
      });
    });
    it('Should be able to cancel order', async () => {
      expect(store.getState().orders.orders.length).toBe(4);
      expect(store.getState().orders.orders[0].status).toEqual(
        orderState.WAITING_FOR_PAYMENT
      );
      await store.dispatch(
        cancelOrder({
          order: store.getState().orders.orders[0],
        })
      );
      expect(store.getState().orders.orders[0].status).toEqual(
        orderState.CANCELLED
      );
    });
    it('Should be able to confirm delivery', async () => {
      expect(store.getState().orders.orders.length).toBe(4);
      expect(store.getState().orders.orders[1].status).toEqual(orderState.PAID);
      await store.dispatch(
        confirmOrder({
          order: store.getState().orders.orders[1],
        })
      );
      expect(store.getState().orders.orders[1].status).toEqual(
        orderState.DELIVERED
      );
    });
  });

  describe('Server responds with error', () => {
    const errorServer = setupServer(...errorHandlers);

    beforeEach(() => {
      errorServer.listen();
    });

    afterEach(async () => {
      errorServer.close();
      serverFulfilled.listen();
      await store.dispatch(getOrders());
      serverFulfilled.close();
    });

    it('Should be detect error when getting orders', async () => {
      expect(store.getState().orders.errorOccurred).toEqual(false);
      await store.dispatch(getOrders());
      await waitFor(async () => {
        expect(store.getState().orders.errorOccurred).toBe(true);
      });
    });
    it('Should be detect error when canceling order', async () => {
      expect(store.getState().orders.errorOccurred).toEqual(false);
      await store.dispatch(
        cancelOrder({
          order: store.getState().orders.orders[0],
        })
      );
      expect(store.getState().orders.errorOccurred).toEqual(true);
    });
    it('Should be detect error when confirming delivery', async () => {
      expect(store.getState().orders.errorOccurred).toEqual(false);
      await store.dispatch(
        confirmOrder({
          order: store.getState().orders.orders[1],
        })
      );
      expect(store.getState().orders.errorOccurred).toEqual(true);
    });
  });
});
