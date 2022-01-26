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
    const { user } = getState();

    const userId = user.user.id;

    let response;

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
              totalDiscountPrice: 0,
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
              totalDiscountPrice: 0,
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
        totalDiscountPrice: 0,
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
          totalDiscountPrice: 0,
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

    let { totalQuantity, totalPrice, totalDiscountPrice } = cart;

    let products = cart.products.slice();
    const productId = product.id;

    const actualPrice =
      product.discountPrice == null ? product.price : product.discountPrice;

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
      totalDiscountPrice = products[inCart].checked
        ? totalDiscountPrice + actualPrice
        : totalDiscountPrice;
    } else {
      products = [
        ...products,
        {
          productId: productId,
          quantity: 1,
          checked: true,
          price: product.price,
          discountPrice: product.discountPrice,
        },
      ];
      totalQuantity = totalQuantity + 1;
      totalPrice = totalPrice + product.price;
      totalDiscountPrice = totalDiscountPrice + actualPrice;
    }

    updatedCart = {
      cart: {
        products: products,
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
        totalDiscountPrice: totalDiscountPrice,
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
          totalDiscountPrice: totalDiscountPrice,
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

    const { totalQuantity, totalPrice, totalDiscountPrice } = cart;

    const products = cart.products.slice();

    const actualPrice =
      product.discountPrice == null ? product.price : product.discountPrice;

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
          totalDiscountPrice: products[cartPosition].checked
            ? totalDiscountPrice - actualPrice
            : totalDiscountPrice,
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
          totalDiscountPrice: products[cartPosition].checked
            ? totalDiscountPrice - actualPrice
            : totalDiscountPrice,
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
          totalDiscountPrice: updatedCart.cart.totalDiscountPrice,
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

    const { totalQuantity, totalPrice, totalDiscountPrice } = cart;

    const products = cart.products.slice();

    const productId = product.id;
    const actualPrice =
      product.discountPrice == null ? product.price : product.discountPrice;

    const cartPosition = findProductIndexById(products, productId);

    const updatedCart = {
      cart: {
        products: products.filter((item) => item.productId !== productId),
        totalQuantity: totalQuantity - products[cartPosition].quantity,
        totalPrice: products[cartPosition].checked
          ? totalPrice - products[cartPosition].quantity * product.price
          : totalPrice,
        totalDiscountPrice: products[cartPosition].checked
          ? totalDiscountPrice - products[cartPosition].quantity * actualPrice
          : totalDiscountPrice,
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
          totalDiscountPrice: totalDiscountPrice,
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
      totalDiscountPrice: response.data.cart.totalDiscountPrice,
    };
  }
);

export const selectProduct = createAsyncThunk(
  'cart/selectProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();

    const userId = user.user.id;

    const { totalQuantity, totalPrice, totalDiscountPrice } = cart;

    const products = cart.products.slice();

    const productId = product.id;

    const actualPrice =
      product.discountPrice == null ? product.price : product.discountPrice;

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
        totalDiscountPrice: products[cartPosition].checked
          ? totalDiscountPrice + actualPrice * products[cartPosition].quantity
          : totalDiscountPrice - actualPrice * products[cartPosition].quantity,
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
          totalDiscountPrice: totalDiscountPrice,
        })
      );
      response = { data: { cart: updatedCart.cart } };
    } else {
      response = await setCart({ userId, cart: updatedCart });
    }

    return {
      cartPosition,
      totalPrice: response.data.cart.totalPrice,
      totalDiscountPrice: response.data.cart.totalDiscountPrice,
    };
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
        state.totalDiscountPrice = action.payload.totalDiscountPrice;
        state.totalQuantity = action.payload.totalQuantity;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products = action.payload.cart.products;
        state.totalQuantity = action.payload.cart.totalQuantity;
        state.totalDiscountPrice = action.payload.cart.totalDiscountPrice;
        state.totalPrice = action.payload.cart.totalPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(addProduct.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(decreaseProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decreaseProduct.fulfilled, (state, action) => {
        state.products = action.payload.cart.products;
        state.totalQuantity = action.payload.cart.totalQuantity;
        state.totalDiscountPrice = action.payload.cart.totalDiscountPrice;
        state.totalPrice = action.payload.cart.totalPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(decreaseProduct.rejected, (state) => {
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
        state.totalDiscountPrice = action.payload.totalDiscountPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
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
        state.totalDiscountPrice = action.payload.totalDiscountPrice;
        state.products[action.payload.cartPosition].checked =
          !state.products[action.payload.cartPosition].checked;
      })
      .addCase(selectProduct.rejected, (state) => {
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
        state.totalDiscountPrice = action.payload.cart.totalDiscountPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(deleteAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.user.cart) {
          const { products, totalPrice, totalQuantity, totalDiscountPrice } =
            action.payload.user.cart;

          state.products = products;
          state.totalPrice = totalPrice;
          state.totalQuantity = totalQuantity;
          state.totalDiscountPrice = totalDiscountPrice;
          localStorage.setItem('cart', {});
        }
      });
  },
});

export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
