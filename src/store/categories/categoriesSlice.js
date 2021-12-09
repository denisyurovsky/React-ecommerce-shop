import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getAllCategories } from '../../api/categories';

import initialState from './initialState';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async () => {
    const response = await getAllCategories();

    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
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
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      });
  },
});

export const selectCategories = (state) => state.categories;
export const { addCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
