import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { setRating } from '../../api/feedback';
import { getSomeProducts } from '../../api/products';
import { NUMBER_OF_CARDS_ON_HOMEPAGE } from '../../helpers/constants/constants';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (searchParams) => {
    const response = await getSomeProducts(searchParams);

    return {
      data: response.data,
      totalCountProducts: response.headers['x-total-count'],
    };
  }
);

export const getHomePageProducts = createAsyncThunk(
  'products/getHomePageProducts',
  async () => {
    const response = await getSomeProducts({
      entity: 'products',
      filters: null,
      sort: {
        field: 'createdAt',
        order: 'desc',
      },
      currentPage: 1,
      itemsPerPage: NUMBER_OF_CARDS_ON_HOMEPAGE,
      text: null,
    });

    return response.data;
  }
);

export const setProductRating = createAsyncThunk(
  'feedback/setProductRating',
  async (productId, { getState }) => {
    const state = getState();

    const feedbackQuantity = state.feedback.ids.length;
    const rating = Object.values(state.feedback.entities).reduce(
      (rating, review) => {
        return rating + review.rating / feedbackQuantity;
      },
      0
    );

    const response = await setRating({ productId, rating });

    return response.data;
  }
);

const productsAdapter = createEntityAdapter();

export const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    isLoading: false,
    errorOccurred: false,
    errorMessage: '',
    totalCountProducts: 0,
  }),
  reducers: {
    addProducts: productsAdapter.upsertMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorOccurred = false;
        state.totalCountProducts = action.payload.totalCountProducts;
        productsAdapter.setAll(state, action.payload.data);
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(getHomePageProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorOccurred = false;
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(getHomePageProducts.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(getHomePageProducts.pending, (state) => {
        state.errorOccurred = false;
        state.isLoading = true;
      })
      .addCase(setProductRating.fulfilled, (state, action) => {
        productsAdapter.upsertOne(state, action.payload);
      });
  },
});

export const { addProducts } = productsSlice.actions;
export default productsSlice.reducer;

export const { selectAll, selectById: getProductById } =
  productsAdapter.getSelectors((state) => state.products);

export const selectProducts = (state) => ({
  data: selectAll(state),
  isLoading: state.products.isLoading,
  errorOccurred: state.products.errorOccurred,
  errorMessage: state.products.errorMessage,
  totalCountProducts: state.products.totalCountProducts,
});

export const getRatingByProductId = (state, id) =>
  getProductById(state, id)?.rating;
