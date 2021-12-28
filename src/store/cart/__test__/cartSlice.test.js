import { configureStore, createSlice } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import productsDto from '../../../test-utils/dto/productsDto';
import { userWithEmptyCart } from '../../../test-utils/dto/userDto';
import {
  addProduct,
  deleteProduct,
  decreaseProduct,
  deleteAllProducts,
  selectProduct,
  getCart,
} from '../cartSlice';

const initialUser = {
  user: {
    id: 1,
  },
};

const initialCart = {
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlicer = createSlice({
  name: 'cart',
  initialState: initialCart,
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
      });
  },
});

const userSlicer = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {},
});

const nonServerUserSlicer = createSlice({
  name: 'user',
  initialState: { user: { id: null } },
  reducers: {},
});

const userReducer = userSlicer.reducer;
const cartReducer = cartSlicer.reducer;
const nonServerUserReducer = nonServerUserSlicer.reducer;

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

const nonServerStore = configureStore({
  reducer: {
    user: nonServerUserReducer,
    cart: cartReducer,
  },
});

const successfulHandlers = [
  rest.put('/cart/1', (req, res, ctx) => {
    userWithEmptyCart.cart.products = req.body.cart.products;
    userWithEmptyCart.cart.totalPrice = req.body.cart.totalPrice;
    userWithEmptyCart.cart.totalQuantity = req.body.cart.totalQuantity;

    return res(ctx.status(200), ctx.json({ cart: req.body.cart }));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userWithEmptyCart));
  }),
];

const errorHandlers = [
  rest.put('/cart/1', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({}));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.status(404), ctx.json({}));
  }),
];

const server = setupServer(...successfulHandlers);

describe('Cart actions', () => {
  describe('Correct server response', () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    it('Should be able to add products', async () => {
      expect(store.getState().cart.products.length).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(store.getState().cart.products.length).toBe(1);
    });
    it('Should be able to decrease products', async () => {
      await store.dispatch(deleteAllProducts());
      expect(store.getState().cart.products.length).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      expect(store.getState().cart.products[1].quantity).toEqual(2);
      expect(store.getState().cart.products[0].quantity).toEqual(2);
      await store.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      expect(store.getState().cart.products[0].quantity).toEqual(1);
      await store.dispatch(
        decreaseProduct({
          product: productsDto[2],
        })
      );
      expect(store.getState().cart.products[1].quantity).toEqual(1);
      await store.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      await store.dispatch(
        decreaseProduct({
          product: productsDto[2],
        })
      );
      expect(store.getState().cart.products.length).toEqual(0);
    });
    it('Should be able to delete particular product', async () => {
      expect(store.getState().cart.products.length).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(store.getState().cart.products[0].quantity).toEqual(1);
      await store.dispatch(
        deleteProduct({
          product: productsDto[1],
        })
      );
      expect(store.getState().cart.products.length).toEqual(0);
    });
    it('Should be able to delete all products', async () => {
      expect(store.getState().cart.products.length).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      await store.dispatch(
        addProduct({
          product: productsDto[3],
        })
      );
      expect(store.getState().cart.products.length).toEqual(3);
      await store.dispatch(deleteAllProducts());
      expect(store.getState().cart.products.length).toEqual(0);
    });
    it('Should be able to mark product', async () => {
      expect(store.getState().cart.products.length).toEqual(0);
      await store.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(store.getState().cart.products[0].checked).toEqual(true);
      await store.dispatch(
        selectProduct({
          product: productsDto[1],
        })
      );
      expect(store.getState().cart.products[0].checked).toEqual(false);
      await store.dispatch(deleteAllProducts());
      expect(store.getState().cart.products.length).toEqual(0);
    });
  });
  describe('Non log ined user', () => {
    it('Should be able to add products', async () => {
      expect(nonServerStore.getState().cart.products.length).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(nonServerStore.getState().cart.products[0].productId).toEqual(
        productsDto[1].id
      );
    });
    it('Should be able to decrease products', async () => {
      await nonServerStore.dispatch(deleteAllProducts());
      expect(nonServerStore.getState().cart.products.length).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      expect(nonServerStore.getState().cart.products[1].quantity).toEqual(2);
      expect(nonServerStore.getState().cart.products[0].quantity).toEqual(2);
      await nonServerStore.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      expect(nonServerStore.getState().cart.products[0].quantity).toEqual(1);
      await nonServerStore.dispatch(
        decreaseProduct({
          product: productsDto[2],
        })
      );
      expect(nonServerStore.getState().cart.products[1].quantity).toEqual(1);
      await nonServerStore.dispatch(
        decreaseProduct({
          product: productsDto[1],
        })
      );
      await nonServerStore.dispatch(
        decreaseProduct({
          product: productsDto[2],
        })
      );
      expect(nonServerStore.getState().cart.products.length).toEqual(0);
    });
    it('Should be able to delete particular product', async () => {
      expect(nonServerStore.getState().cart.products.length).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(nonServerStore.getState().cart.products[0].quantity).toEqual(1);
      await nonServerStore.dispatch(
        deleteProduct({
          product: productsDto[1],
        })
      );
      expect(nonServerStore.getState().cart.products.length).toEqual(0);
    });
    it('Should be able to delete all products', async () => {
      expect(nonServerStore.getState().cart.products.length).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[2],
        })
      );
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[3],
        })
      );
      expect(nonServerStore.getState().cart.products.length).toEqual(3);
      await nonServerStore.dispatch(deleteAllProducts());
      expect(nonServerStore.getState().cart.products.length).toEqual(0);
    });
    it('Should be able to mark product', async () => {
      expect(nonServerStore.getState().cart.products.length).toEqual(0);
      await nonServerStore.dispatch(
        addProduct({
          product: productsDto[1],
        })
      );
      expect(nonServerStore.getState().cart.products[0].checked).toEqual(true);
      await nonServerStore.dispatch(
        selectProduct({
          product: productsDto[1],
        })
      );
      expect(nonServerStore.getState().cart.products[0].checked).toEqual(false);
      await nonServerStore.dispatch(deleteAllProducts());
      expect(nonServerStore.getState().cart.products.length).toEqual(0);
    });
  });
  describe('Server responds with error', () => {
    const errorServer = setupServer(...errorHandlers);

    beforeEach(() => {
      errorServer.listen();
    });

    afterEach(async () => {
      errorServer.close();
      server.listen();
      await store.dispatch(getCart());
      server.close();
    });

    beforeEach(() => {});
    it('Should be able to detect getCart error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(getCart());
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
    it('Should be able to detect addProduct error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(addProduct({ product: productsDto[1] }));
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
    it('Should be able to detect decreaseProduct error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(decreaseProduct({ product: productsDto[1] }));
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
    it('Should be able to detect deleteProduct error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(deleteProduct({ product: productsDto[1] }));
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });

    it('Should be able to detect markProoduct error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(selectProduct({ product: productsDto[1] }));
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
    it('Should be able to detect deleteAllProducts error', async () => {
      expect(store.getState().cart.errorOccurred).toEqual(false);
      await store.dispatch(deleteAllProducts());
      expect(store.getState().cart.errorOccurred).toEqual(true);
    });
  });
});
