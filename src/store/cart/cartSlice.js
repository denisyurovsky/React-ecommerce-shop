import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { setCart } from '../../api/cart';
import { getUser } from '../../api/user';
import { isGuest } from '../../helpers/isGuest';
import { findProductIndexById } from '../../helpers/utils/findProductIndexById';
import { getCartFromStorage } from '../../helpers/utils/getCartFromStorage';
import { loginUser } from '../user/userSlice';

import { initialState } from './initialState';

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (payload, { getState }) => {
    let response;

    const { user } = getState();

    const userId = user.user.id;

    if (isGuest(userId)) {
      if (getCartFromStorage()) {
        response = { data: { cart: getCartFromStorage() } };
      } else {
        response = {
          data: {
            cart: {
              products: [],
              totalQuantity: 0,
              totalPrice: 0,
            },
          },
        };
      }
    } else {
      response = await getUser(userId);
      if (!response.data.cart) {
        response = {
          data: {
            cart: {
              products: [],
              totalQuantity: 0,
              totalPrice: 0,
            },
          },
        };
      }
    }

    return response.data.cart;
  }
);

export const deleteAllProducts = createAsyncThunk(
  'cart/deleteAllProducts',
  async (payload, { getState }) => {
    const { user } = getState();

    const userId = user.user.id;

    const updatedCart = {
      cart: {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
      },
    };

    let answer;

    if (isGuest(userId)) {
      answer = {
        data: {
          cart: updatedCart.cart,
        },
      };
      localStorage.setItem(
        'cart',
        JSON.stringify({
          products: [],
          totalQuantity: 0,
          totalPrice: 0,
        })
      );
    } else {
      answer = await setCart({ userId, cart: updatedCart });
    }

    return answer.data;
  }
);

export const addProduct = createAsyncThunk(
  'cart/addProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();

    const userId = user.user.id;

    let totalQuantity = cart.totalQuantity;
    let totalPrice = cart.totalPrice;
    let products = cart.products.slice();

    const productId = product.id;
    const inCart = findProductIndexById(products, productId);

    let updatedCart;

    if (inCart !== -1) {
      products[inCart] = {
        ...products[inCart],
        quantity: products[inCart].quantity + 1,
      };
      totalQuantity = totalQuantity + 1;
      totalPrice = products[inCart].checked
        ? totalPrice + product.price
        : totalPrice;
    } else {
      (products = [
        ...products,
        {
          productId: productId,
          quantity: 1,
          checked: true,
          price: product.price,
        },
      ]),
        (totalQuantity = totalQuantity + 1);
      totalPrice = totalPrice + product.price;
    }

    updatedCart = {
      cart: {
        products: products,
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
      },
    };

    let response;

    if (isGuest(userId)) {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          products: products,
          totalQuantity: totalQuantity,
          totalPrice: totalPrice,
        })
      );
      response = { data: { cart: updatedCart.cart } };
    } else {
      response = await setCart({ userId, cart: updatedCart });
    }

    return response.data;
  }
);

export const decreaseProduct = createAsyncThunk(
  'cart/decreaseProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();

    const userId = user.user.id;

    const totalQuantity = cart.totalQuantity;
    const totalPrice = cart.totalPrice;
    const products = cart.products.slice();

    const productId = product.id;
    const cartPosition = findProductIndexById(products, productId);

    let updatedCart;

    if (products[cartPosition].quantity == 1) {
      updatedCart = {
        cart: {
          products: products.filter((item) => item.productId !== productId),
          totalQuantity: totalQuantity - 1,
          totalPrice: products[cartPosition].checked
            ? totalPrice - product.price
            : totalPrice,
        },
      };
    } else {
      products[cartPosition] = {
        ...products[cartPosition],
        quantity: products[cartPosition].quantity - 1,
      };
      updatedCart = {
        cart: {
          products: [...products],
          totalQuantity: totalQuantity - 1,
          totalPrice: products[cartPosition].checked
            ? totalPrice - product.price
            : totalPrice,
        },
      };
    }

    let response;

    if (isGuest(userId)) {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          products: updatedCart.cart.products,
          totalQuantity: updatedCart.cart.totalQuantity,
          totalPrice: updatedCart.cart.totalPrice,
        })
      );
      response = { data: { cart: updatedCart.cart } };
    } else {
      response = await setCart({ userId, cart: updatedCart });
    }

    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'cart/deleteProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();

    const userId = user.user.id;

    const totalQuantity = cart.totalQuantity;
    const totalPrice = cart.totalPrice;
    const products = cart.products.slice();

    const productId = product.id;

    const cartPosition = findProductIndexById(products, productId);

    const updatedCart = {
      cart: {
        products: products.filter((item) => item.productId !== productId),
        totalQuantity: totalQuantity - products[cartPosition].quantity,
        totalPrice: products[cartPosition].checked
          ? totalPrice - products[cartPosition].quantity * product.price
          : totalPrice,
      },
    };

    let response;

    if (userId == null) {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          products: products,
          totalQuantity: totalQuantity,
          totalPrice: totalPrice,
        })
      );
      response = { data: { cart: updatedCart.cart } };
    } else {
      response = await setCart({ userId, cart: updatedCart });
    }

    return {
      productId,
      totalPrice: response.data.cart.totalPrice,
      totalQuantity: response.data.cart.totalQuantity,
    };
  }
);

export const selectProduct = createAsyncThunk(
  'cart/selectProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();

    const userId = user.user.id;

    const totalQuantity = cart.totalQuantity;
    const totalPrice = cart.totalPrice;
    const products = cart.products.slice();

    const productId = product.id;
    const cartPosition = findProductIndexById(products, productId);

    products[cartPosition] = {
      ...products[cartPosition],
      checked: !products[cartPosition].checked,
    };

    const updatedCart = {
      cart: {
        products: products,
        totalQuantity: totalQuantity,
        totalPrice: products[cartPosition].checked
          ? totalPrice + product.price * products[cartPosition].quantity
          : totalPrice - product.price * products[cartPosition].quantity,
      },
    };

    let response;

    if (isGuest(userId)) {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          products: products,
          totalQuantity: totalQuantity,
          totalPrice: totalPrice,
        })
      );
      response = { data: { cart: updatedCart.cart } };
    } else {
      response = await setCart({ userId, cart: updatedCart });
    }

    return { cartPosition, totalPrice: response.data.cart.totalPrice };
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        state.totalQuantity = action.payload.totalQuantity;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload.cart.products;
        state.totalQuantity = action.payload.cart.totalQuantity;
        state.totalPrice = action.payload.cart.totalPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(decreaseProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decreaseProduct.fulfilled, (state, action) => {
        state.products = action.payload.cart.products;
        state.totalQuantity = action.payload.cart.totalQuantity;
        state.totalPrice = action.payload.cart.totalPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(decreaseProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.productId !== action.payload.productId
        );
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(selectProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorOccurred = false;
        state.totalPrice = action.payload.totalPrice;
        state.products[action.payload.cartPosition].checked =
          !state.products[action.payload.cartPosition].checked;
      })
      .addCase(selectProduct.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(deleteAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllProducts.fulfilled, (state, action) => {
        state.products = action.payload.cart.products;
        state.totalQuantity = action.payload.cart.totalQuantity;
        state.totalPrice = action.payload.cart.totalPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(deleteAllProducts.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.user.cart) {
          state.products = action.payload.user.cart.products;
          state.totalPrice = action.payload.user.cart.totalPrice;
          state.totalQuantity = action.payload.user.cart.totalQuantity;
          localStorage.setItem('cart', {});
        }
      });
  },
});

export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
