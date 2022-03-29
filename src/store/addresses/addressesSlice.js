import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import addressApi from '../../api/addresses';
import { updateUser } from '../user/userSlice';

import initialState from './initialState';

export const getAddressesByIds = createAsyncThunk(
  'addresses/getAddressesByIds',
  async (ids) => {
    const response = ids.length
      ? await addressApi.getAddresses(ids)
      : { data: [] };

    return response.data;
  }
);

export const addAddress = createAsyncThunk(
  'addresses/addAddress',
  async ({ address, user }, thunkAPI) => {
    const response = await addressApi.add(address);

    const newUser = {
      ...user,
      addresses: [...user.addresses, response.data.id],
    };

    thunkAPI.dispatch(updateUser(newUser));

    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  'addresses/editAddress',
  async (address) => {
    const response = await addressApi.edit(address);

    return response.data;
  }
);

export const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddressesByIds.pending, (state) => {
        state.isLoading = true;
        state.errorOccurred = false;
      })
      .addCase(getAddressesByIds.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorMessage: '',
          errorOccurred: false,
          data: action.payload,
        };

        return newState;
      })
      .addCase(getAddressesByIds.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
        state.errorOccurred = false;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        const newState = {
          ...state,
          isLoading: false,
          errorMessage: '',
          errorOccurred: false,
          data: [...state.data, action.payload],
        };

        return newState;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
        state.errorOccurred = false;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        const newData = state.data.map((d) =>
          d.id === action.payload.id ? action.payload : d
        );
        const newState = {
          ...state,
          isLoading: false,
          errorMessage: '',
          errorOccurred: false,
          data: newData,
        };

        return newState;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      });
  },
});

export const selectAddresses = (state) => state.addresses;
export default addressesSlice.reducer;
