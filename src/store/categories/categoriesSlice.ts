import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import categoriesApi from '../../api/categories';
import { RootState } from '../store';

import initialState from './initialState';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const response = await categoriesApi.get();

    return response;
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategories: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorOccurred: false,
          data: action.payload,
        };

        return newState;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.errorMessage = action.error.message || '';
        state.isLoading = false;
        state.errorOccurred = true;
      });
  },
});

export const selectCategories = (state: RootState) => state.categories;
export const { addCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
