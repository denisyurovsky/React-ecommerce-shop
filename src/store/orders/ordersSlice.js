import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getUsersOrders,
  cancelUsersOrder,
  confirmUsersOrder,
} from '../../api/orders';

import { inititalState } from './initialState';

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (payload, { getState }) => {
    const { user } = getState();

    const response = await getUsersOrders({ userId: user.user.id });

    return response.data;
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async ({ order }, { getState }) => {
    const { user } = getState();

    const response = await cancelUsersOrder({
      orderId: order.id,
      userId: user.user.id,
    });

    return response.data;
  }
);

export const confirmOrder = createAsyncThunk(
  'orders/confirmOrder',
  async ({ order }, { getState }) => {
    const { user } = getState();

    const response = await confirmUsersOrder({
      orderId: order.id,
      userId: user.user.id,
    });

    return response.data;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: inititalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getOrders
      .addCase(getOrders.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorOccurred = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorOccurred = false;
        const order = state.orders.find(
          (order) => order.id === action.payload.orderId
        );

        order.status = action.payload.orderStatus;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(confirmOrder.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorOccurred = false;
        const order = state.orders.find(
          (order) => order.id === action.payload.orderId
        );

        order.deliveredAt = action.payload.deliveredAt;
        order.status = action.payload.orderStatus;
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      });
  },
});

export const selectOrders = (state) => state.orders;

export default ordersSlice.reducer;
