import { configureStore } from '@reduxjs/toolkit';

import addressesReducer from './addresses/addressesSlice';
import cartReducer from './cart/cartSlice';
import categoriesReducer from './categories/categoriesSlice';
import citiesReducer from './cities/citiesSlice';
import countriesReducer from './countries/countriesSlice';
import feedbackReducer from './feedback/feedbackSlice';
import ordersReducer from './orders/ordersSlice';
import productsReducer from './products/productsSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    cart: cartReducer,
    user: userReducer,
    products: productsReducer,
    categories: categoriesReducer,
    feedback: feedbackReducer,
    countries: countriesReducer,
    cities: citiesReducer,
    addresses: addressesReducer,
  },
});
