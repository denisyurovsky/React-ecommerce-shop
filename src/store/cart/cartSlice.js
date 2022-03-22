import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';

import { setCart } from '../../api/cart';
import { getUser } from '../../api/user';
import deleteCheckedProducts from '../../helpers/deleteCheckedProducts';
import { findProductIndexById } from '../../helpers/findProductIndexById';
import { getCartFromStorage } from '../../helpers/getCartFromStorage';
import getCheckedProductsQuantity from '../../helpers/getCheckedProductsQuantity';
import { isGuest } from '../../helpers/isGuest';
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
              sellers: {},
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
              sellers: {},
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
        sellers: {},
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
          sellers: {},
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

    let { totalQuantity, totalPrice, totalDiscountPrice, sellers } = cart;
    const { id: productId, userId: sellerId, actualPrice } = product;

    let products = [];

    if (sellers[sellerId]) {
      products = sellers[sellerId].products.slice();
    }

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
          userId: sellerId,
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
        sellers: {
          ...sellers,
          [sellerId]: {
            products: products,
            checked: sellers[sellerId] ? sellers[sellerId].checked : true,
          },
        },
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
          sellers: updatedCart.cart.sellers,
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

export const decreaseProduct = createAsyncThunk(
  'cart/decreaseProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();

    const userId = user.user.id;
    const { totalPrice, totalQuantity, sellers, totalDiscountPrice } = cart;
    const { id: productId, userId: sellerId, actualPrice } = product;

    const products = sellers[sellerId].products.slice();

    const cartPosition = findProductIndexById(products, productId);

    let updatedCart;

    if (products[cartPosition].quantity == 1) {
      updatedCart = {
        cart: {
          sellers: {
            ...sellers,
            [sellerId]: {
              products: products.filter((item) => item.productId !== productId),
              checked: sellers[sellerId].checked,
            },
          },
          totalQuantity: totalQuantity - 1,
          totalPrice: products[cartPosition].checked
            ? totalPrice - product.price
            : totalPrice,
          totalDiscountPrice: products[cartPosition].checked
            ? totalDiscountPrice - actualPrice
            : totalDiscountPrice,
        },
      };

      if (updatedCart.cart.sellers[sellerId].products.length == 0) {
        delete updatedCart.cart.sellers[sellerId];
      }
    } else {
      products[cartPosition] = {
        ...products[cartPosition],
        quantity: products[cartPosition].quantity - 1,
      };
      updatedCart = {
        cart: {
          sellers: {
            ...sellers,
            [sellerId]: {
              products: products,
              checked: sellers[sellerId].checked,
            },
          },
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
          sellers: sellers,
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

    const { id: productId, userId: sellerId, actualPrice } = product;
    const { totalPrice, totalQuantity, sellers, totalDiscountPrice } = cart;

    const products = sellers[sellerId].products.slice();

    const cartPosition = findProductIndexById(products, productId);

    const updatedCart = {
      cart: {
        sellers: {
          ...sellers,
          [sellerId]: {
            products: products.filter((item) => item.productId !== productId),
            checked: sellers[sellerId].checked,
          },
        },
        totalQuantity: totalQuantity - products[cartPosition].quantity,
        totalPrice: products[cartPosition].checked
          ? totalPrice - products[cartPosition].quantity * product.price
          : totalPrice,
        totalDiscountPrice: products[cartPosition].checked
          ? totalDiscountPrice - products[cartPosition].quantity * actualPrice
          : totalDiscountPrice,
      },
    };

    if (updatedCart.cart.sellers[sellerId].products.length == 0) {
      delete updatedCart.cart.sellers[sellerId];
    }

    let response;

    if (userId == null) {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          sellers: updatedCart.cart.sellers,
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

export const deleteSelectedProducts = createAsyncThunk(
  'cart/deleteSelectedProducts',
  async (payload, { getState }) => {
    const { user, cart } = getState();
    const userId = user.user.id;

    const cartProducts = _.cloneDeep(cart);

    const updatedTotalQuantity =
      cartProducts.totalQuantity -
      getCheckedProductsQuantity(cartProducts.sellers);

    const updatedCart = {
      sellers: deleteCheckedProducts(cartProducts.sellers),
      totalPrice: 0,
      totalDiscountPrice: 0,
      totalQuantity: updatedTotalQuantity,
    };

    let answer;

    if (isGuest(userId)) {
      answer = {
        data: {
          cart: updatedCart,
        },
      };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      answer = await setCart({ userId, cart: { cart: updatedCart } });
    }

    return answer.data;
  }
);

export const selectProduct = createAsyncThunk(
  'cart/selectProduct',
  async ({ product }, { getState }) => {
    const { user, cart } = getState();

    const { totalQuantity, totalPrice, sellers, totalDiscountPrice } = cart;
    const { id: productId, userId: sellerId, actualPrice } = product;
    const userId = user.user.id;

    const products = cart.sellers[sellerId].products.slice();
    const cartPosition = findProductIndexById(products, productId);

    products[cartPosition] = {
      ...products[cartPosition],
      checked: !products[cartPosition].checked,
    };

    const updatedCart = {
      cart: {
        sellers: {
          ...sellers,
          [sellerId]: {
            products: products,
            checked: sellers[sellerId].checked,
          },
        },
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
          sellers: updatedCart.cart.sellers,
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

export const selectSellersProducts = createAsyncThunk(
  'cart/selectSellersProducts',
  async ({ sellerId }, { getState }) => {
    const { cart, user } = getState();

    const userId = user.user.id;

    const sellerChecked = cart.sellers[sellerId].checked;

    const { totalQuantity, sellers, totalPrice, totalDiscountPrice } = cart;

    const products = cart.sellers[sellerId].products.slice();

    const newProducts = products.map((product) => {
      if (product.userId == sellerId) {
        return { ...product, checked: !sellerChecked };
      } else {
        return product;
      }
    });

    const newSellers = { ...sellers };

    newSellers[sellerId] = { products: newProducts, checked: !sellerChecked };

    const updatedCart = {
      cart: {
        sellers: newSellers,
        totalQuantity: totalQuantity,
        totalPrice:
          totalPrice +
          newProducts.reduce((prev, current, index) => {
            const difference =
              products[index].checked == current.checked
                ? 0
                : current.price * current.quantity;

            return prev + (sellerChecked ? -difference : difference);
          }, 0),
        totalDiscountPrice:
          totalDiscountPrice +
          newProducts.reduce((prev, current, index) => {
            const actualPrice =
              current.discountPrice === null
                ? current.price
                : current.discountPrice;

            const difference =
              products[index].checked == current.checked
                ? 0
                : actualPrice * current.quantity;

            return prev + (sellerChecked ? -difference : difference);
          }, 0),
      },
    };

    let response;

    if (isGuest(userId)) {
      localStorage.setItem('cart', JSON.stringify(updatedCart.cart));
      response = { data: { cart: updatedCart.cart } };
    } else {
      response = await setCart({ userId, cart: updatedCart });
    }

    return response.data;
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
        state.sellers = action.payload.sellers;
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
        state.sellers = action.payload.cart.sellers;
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
        state.sellers = action.payload.cart.sellers;
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
        const { sellers, totalPrice, totalQuantity, totalDiscountPrice } =
          action.payload.cart;

        state.sellers = sellers;
        state.totalPrice = totalPrice;
        state.totalQuantity = totalQuantity;
        state.totalDiscountPrice = totalDiscountPrice;

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
        const { sellers, totalPrice, totalQuantity, totalDiscountPrice } =
          action.payload.cart;

        state.sellers = sellers;
        state.totalPrice = totalPrice;
        state.totalQuantity = totalQuantity;
        state.totalDiscountPrice = totalDiscountPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(selectProduct.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(deleteAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAllProducts.fulfilled, (state, action) => {
        const { sellers, totalPrice, totalQuantity, totalDiscountPrice } =
          action.payload.cart;

        state.sellers = sellers;
        state.totalPrice = totalPrice;
        state.totalQuantity = totalQuantity;
        state.totalDiscountPrice = totalDiscountPrice;
        state.isLoading = false;
        state.errorOccurred = false;
      })
      .addCase(deleteAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.errorOccurred = true;
      })
      .addCase(selectSellersProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectSellersProducts.fulfilled, (state, action) => {
        const { sellers, totalPrice, totalQuantity, totalDiscountPrice } =
          action.payload.cart;

        state.sellers = sellers;
        state.totalPrice = totalPrice;
        state.totalQuantity = totalQuantity;
        state.totalDiscountPrice = totalDiscountPrice;
        state.isLoading = false;
        state.errorOccurred = false;
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
      .addCase(deleteSelectedProducts.fulfilled, (state, action) => {
        state.sellers = action.payload.cart.sellers;
        state.totalQuantity = action.payload.cart.totalQuantity;
        state.totalPrice = action.payload.cart.totalPrice;
        state.totalDiscountPrice = action.payload.cart.totalDiscountPrice;
        state.isLoading = false;
        state.errorOccurred = false;
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
