import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ordersApi from '../../api/orders';
import getProductQuantity from '../../helpers/getProductQuantity';

import { initialState } from './initialState';

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (payload, { getState }) => {
    const { user } = getState();
    const response = await ordersApi.getUsersOrders(user.user.id);

    return response.data;
  }
);

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async ({ productsData, addressData, addressId }, { getState }) => {
    const { user, cart } = getState();
    const products = productsData.map((p) => ({
      originalProductId: p.id,
      price: p.price,
      discountPrice: p.discountPrice,
      images: p.images,
      name: p.name,
      quantity: getProductQuantity(cart.sellers, p.id),
    }));

    const response = await ordersApi.addUserOrder({
      products,
      userId: user.user.id,
      status: 1,
      addressId,
      deliveryAddress: addressData,
      deliveryPrice: 10,
      totalQuantity: products.reduce((acc, p) => acc + p.quantity, 0),
      totalPrice: cart.totalPrice,
      totalDiscountPrice: cart.totalDiscountPrice,
      deliveredAt: null,
    });

    return response.data;
  }
);

export const editAddressOrder = createAsyncThunk(
  'orders/editAddressOrder',
  async ({ orderId, addressData, addressId }) => {
    const deliveryAddress = addressData;
    const response = await ordersApi.editUserAddressOrder(
      orderId,
      deliveryAddress,
      addressId
    );

    return response.data;
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async ({ order }, { getState }) => {
    const { user } = getState();

    const response = await ordersApi.cancelUsersOrder({
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

    const response = await ordersApi.confirmUsersOrder({
      orderId: order.id,
      userId: user.user.id,
    });

    return response.data;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
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
      //editAddressOrder
      .addCase(editAddressOrder.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(editAddressOrder.fulfilled, (state, action) => {
        const newOrders = state.orders.map((order) => {
          if (action.payload.id === order.id) return action.payload;

          return order;
        });

        const newState = {
          ...state,
          isLoading: false,
          errorMessage: '',
          errorOccurred: false,
          orders: newOrders,
        };

        return newState;
      })
      .addCase(editAddressOrder.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      //addOrder
      .addCase(addOrder.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorMessage: '',
          errorOccurred: false,
          orders: [...state.orders, action.payload],
        };

        return newState;
      })
      .addCase(addOrder.rejected, (state, action) => {
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
