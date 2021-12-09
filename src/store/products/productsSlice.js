import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getSomeProducts, getAllProducts } from '../../api/products';
import { NUMBER_OF_CARDS_ON_HOMEPAGE } from '../../helpers/constants/constants';

import initialState from './initialState';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await getAllProducts();

    return response.data;
  }
);

export const getHomePageProducts = createAsyncThunk(
  'products/getHomePageProducts',
  async () => {
    const response = await getSomeProducts({
      sortField: 'createdAt',
      sortType: 'desc',
      startPage: 0,
      endPage: NUMBER_OF_CARDS_ON_HOMEPAGE,
    });

    return response.data;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorOccurred: false,
          data: action.payload,
        };

        return newState;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(getHomePageProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorOccurred = false;
        state.data = action.payload;
      })
      .addCase(getHomePageProducts.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(getHomePageProducts.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      });
  },
});

export const selectProducts = (state) => state.products;
export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;
