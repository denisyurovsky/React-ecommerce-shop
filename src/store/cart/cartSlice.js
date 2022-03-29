import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import cartApi from '../../api/cart';
import { getUser } from '../../api/user';
import deleteCheckedProducts from '../../helpers/deleteCheckedProducts';
import { findProductIndexById } from '../../helpers/findProductIndexById';
import { getCartFromStorage } from '../../helpers/getCartFromStorage';
import { isGuest } from '../../helpers/isGuest';
import { loginUser } from '../user/userSlice';

import { initialState } from './initialState';

const fetchCart = async (updatedCart, userId) => {
  const response = isGuest(userId)
    ? await cartApi.calculateGuestPrice(updatedCart)
    : await cartApi.set(updatedCart);

  if (isGuest(userId)) {
    localStorage.setItem('cart', JSON.stringify(response.data.cart));
  }

  return response.data.cart;
};

const setNewCart = (state, payload) => {
  state.sellers = payload?.sellers ?? {};
  state.totalPrice = payload?.totalPrice ?? 0;
  state.totalDiscountPrice = payload?.totalDiscountPrice ?? 0;
  state.totalQuantity = payload?.totalQuantity ?? 0;
  (state.sellersDiscount = payload?.sellersDiscount ?? 0),
    (state.personalDiscount = payload?.personalDiscount ?? 0),
    (state.isLoading = false);
  state.errorOccurred = false;
};

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { getState }) => {
    const { user } = getState();
    const userId = user.user.id;

    let cart = null;

    if (isGuest(userId)) {
      if (getCartFromStorage()) {
        cart = getCartFromStorage();
      } else {
        cart = {
          sellers: {},
          totalQuantity: 0,
          totalPrice: 0,
          totalDiscountPrice: 0,
        };
      }
    } else {
      let response = await getUser(userId);

      cart = response.data.cart;
      if (!cart) {
        cart = {
          sellers: {},
          totalQuantity: 0,
          totalPrice: 0,
          totalDiscountPrice: 0,
        };
      }
    }

    return cart;
  }
);

export const deleteAllProducts = createAsyncThunk(
  'cart/deleteAllProducts',
  async (payload, { getState }) => {
    const { user } = getState();
    const userId = user.user.id;

    if (isGuest(userId)) {
      localStorage.removeItem('cart');
    } else {
      await cartApi.delete();
    }
  }
);

export const addProduct = createAsyncThunk(
  'cart/addProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();
    const { sellers } = cart;
    const { id: productId, userId: sellerId } = product;

    const userId = user.user.id;

    let products = [];
    let updatedCart;

    if (sellers[sellerId]) {
      products = sellers[sellerId].products.slice();
    }

    const inCart = findProductIndexById(products, productId);

    if (inCart !== -1) {
      products[inCart] = {
        ...products[inCart],
        quantity: products[inCart].quantity + 1,
      };
    } else {
      products = [
        ...products,
        {
          userId: sellerId,
          productId: productId,
          quantity: 1,
          checked: true,
          price: product.price,
          discountPrice: product.discountPrice,
        },
      ];
    }

    updatedCart = {
      sellers: {
        ...sellers,
        [sellerId]: {
          products: products,
          checked: sellers[sellerId] ? sellers[sellerId].checked : true,
        },
      },
    };

    return await fetchCart(updatedCart, userId);
  }
);

export const decreaseProduct = createAsyncThunk(
  'cart/decreaseProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();
    const { sellers } = cart;
    const { id: productId, userId: sellerId } = product;

    const userId = user.user.id;
    const products = sellers[sellerId].products.slice();

    const cartPosition = findProductIndexById(products, productId);

    let updatedCart;

    if (products[cartPosition].quantity == 1) {
      updatedCart = {
        sellers: {
          ...sellers,
          [sellerId]: {
            products: products.filter((item) => item.productId !== productId),
            checked: sellers[sellerId].checked,
          },
        },
      };

      if (updatedCart.sellers[sellerId].products.length == 0) {
        delete updatedCart.sellers[sellerId];
      }
    } else {
      products[cartPosition] = {
        ...products[cartPosition],
        quantity: products[cartPosition].quantity - 1,
      };
      updatedCart = {
        sellers: {
          ...sellers,
          [sellerId]: {
            products: products,
            checked: sellers[sellerId].checked,
          },
        },
      };
    }

    return await fetchCart(updatedCart, userId);
  }
);

export const deleteProduct = createAsyncThunk(
  'cart/deleteProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();
    const { id: productId, userId: sellerId } = product;
    const { sellers } = cart;

    const userId = user.user.id;
    const products = sellers[sellerId].products.slice();

    const updatedCart = {
      sellers: {
        ...sellers,
        [sellerId]: {
          products: products.filter((item) => item.productId !== productId),
          checked: sellers[sellerId].checked,
        },
      },
    };

    if (updatedCart.sellers[sellerId].products.length == 0) {
      delete updatedCart.sellers[sellerId];
    }

    return await fetchCart(updatedCart, userId);
  }
);

export const deleteSelectedProducts = createAsyncThunk(
  'cart/deleteSelectedProducts',
  async (payload, { getState }) => {
    const { user, cart } = getState();
    const userId = user.user.id;

    const cartProducts = _.cloneDeep(cart);

    const updatedCart = {
      sellers: deleteCheckedProducts(cartProducts.sellers),
    };

    return await fetchCart(updatedCart, userId);
  }
);

export const selectProduct = createAsyncThunk(
  'cart/selectProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();

    const { sellers } = cart;
    const { id: productId, userId: sellerId } = product;
    const userId = user.user.id;

    const products = cart.sellers[sellerId].products.slice();
    const cartPosition = findProductIndexById(products, productId);

    products[cartPosition] = {
      ...products[cartPosition],
      checked: !products[cartPosition].checked,
    };

    const updatedCart = {
      sellers: {
        ...sellers,
        [sellerId]: {
          products: products,
          checked: sellers[sellerId].checked,
        },
      },
    };

    return await fetchCart(updatedCart, userId);
  }
);

export const selectSellersProducts = createAsyncThunk(
  'cart/selectSellersProducts',
  async ({ sellerId }, { getState }) => {
    const { cart, user } = getState();
    const { sellers } = cart;

    const userId = user.user.id;
    const sellerChecked = cart.sellers[sellerId].checked;
    const products = cart.sellers[sellerId].products.slice();

    const newProducts = products.map((product) => {
      if (product.userId == sellerId) {
        return { ...product, checked: !sellerChecked };
      } else {
        return product;
      }
    });

    const updatedCart = {
      sellers: {
        ...sellers,
        [sellerId]: { products: newProducts, checked: !sellerChecked },
      },
    };

    return await fetchCart(updatedCart, userId);
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
      .addCase(getCart.fulfilled, (state, { payload }) => {
        setNewCart(state, payload);
      })
      .addCase(getCart.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        setNewCart(state, payload);
      })
      .addCase(addProduct.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(decreaseProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decreaseProduct.fulfilled, (state, { payload }) => {
        setNewCart(state, payload);
      })
      .addCase(decreaseProduct.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        setNewCart(state, payload);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(selectProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectProduct.fulfilled, (state, { payload }) => {
        setNewCart(state, payload);
      })
      .addCase(selectProduct.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(deleteAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllProducts.fulfilled, (state) => {
        setNewCart(state);
      })
      .addCase(deleteAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(selectSellersProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectSellersProducts.fulfilled, (state, { payload }) => {
        setNewCart(state, payload);
      })
      .addCase(selectSellersProducts.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(deleteSelectedProducts.pending, (state) => {
        state.isLoading = true;
        state.errorOccurred = false;
      })
      .addCase(deleteSelectedProducts.fulfilled, (state, { payload }) => {
        setNewCart(state, payload);
      })
      .addCase(deleteSelectedProducts.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.data.user.cart) {
          const { sellers, totalPrice, totalQuantity, totalDiscountPrice } =
            action.payload.data.user.cart;

          state.sellers = sellers;
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
