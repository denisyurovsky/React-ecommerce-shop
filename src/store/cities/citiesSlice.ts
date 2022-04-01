import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import citiesApi from '../../api/cities';
import { RootState } from '../store';

import initialState from './initialState';

export const getCities = createAsyncThunk(
  'cities/getCities',
  async (countryCode: string) => {
    const { data } = countryCode
      ? await citiesApi.get(countryCode)
      : { data: { cities: [] } };

    return data.cities;
  }
);

export const citesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorMessage: '',
          errorOccurred: false,
          data: action.payload,
        };

        return newState;
      })
      .addCase(getCities.rejected, (state, action) => {
        state.errorMessage = action.error.message || '';
        state.isLoading = false;
        state.errorOccurred = true;
      });
  },
});

export const selectCities = (state: RootState) => state.cities;
export default citesSlice.reducer;
