import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart/cartSlice';
import categoriesReducer from './categories/categoriesSlice';
import feedbackReducer from './feedback/feedbackSlice';
import productsReducer from './products/productsSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productsReducer,
    categories: categoriesReducer,
    feedback: feedbackReducer,
  },
});
