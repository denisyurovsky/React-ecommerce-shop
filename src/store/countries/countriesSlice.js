import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import countriesApi from '../../api/countries';

import initialState from './initialState';

export const getCountries = createAsyncThunk(
  'countries/getCountries',
  async () => {
    const response = await countriesApi.get();

    return response.data;
  }
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorOccurred: false,
          data: action.payload,
        };

        return newState;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      });
  },
});

export const selectCountries = (state) => state.countries;
export default countriesSlice.reducer;
