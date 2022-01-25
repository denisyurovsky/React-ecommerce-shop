import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Provider } from 'react-redux';

import {
  addProduct,
  decreaseProduct,
  deleteAllProducts,
  deleteProduct,
  getCart,
  selectProduct,
} from '../../../store/cart/cartSlice';
import { loginUser, registerUser } from '../../../store/user/userSlice';
import testProducts from '../../../test-utils/dto/productsDto';
import renderWithStore from '../../../test-utils/renderWithStore';
import RouterConnected from '../../../test-utils/RouterConnected';
import { CartPage } from '../CartPage';

let initialCart = {
  products: [
    {
      productId: testProducts[0].id,
      price: testProducts[0].price,
      quantity: 1,
      checked: true,
    },
    {
      productId: testProducts[1].id,
      price: testProducts[1].price,
      quantity: 1,
      checked: true,
    },
    {
      productId: testProducts[2].id,
      price: testProducts[2].price,
      quantity: 1,
      checked: true,
    },
  ],
  totalQuantity: 3,
  totalPrice:
    testProducts[0].price + testProducts[1].price + testProducts[2].price,
  isLoading: false,
  errorOccurred: false,
};

let serverUser = {
  id: 1,
  cart: {
    products: [
      {
        productId: testProducts[0].id,
        price: testProducts[0].price,
        quantity: 1,
        checked: true,
      },
      {
        productId: testProducts[1].id,
        price: testProducts[1].price,
        quantity: 1,
        checked: true,
      },
      {
        productId: testProducts[2].id,
        price: testProducts[2].price,
        quantity: 1,
        checked: true,
      },
    ],
    totalQuantity: 3,
    totalPrice:
      testProducts[0].price + testProducts[1].price + testProducts[2].price,
    isLoading: false,
    errorOccurred: false,
  },
  isLoading: false,
  errorOccurred: false,
};

const initialUser = {
  user: { id: 1 },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginStatus = PENDING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = FULFILLED;
        state.user.amountOfTries = 0;
        state.user.id = action.payload.user.id;
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.user = {
          ...state.user,
          ...action.payload.user,
        };
      })
      .addCase(loginUser.rejected, (state) => {
        state.user.amountOfTries++;

        if (state.user.amountOfTries >= MAX_LOGIN_ATTEMPTS) {
          state.loginStatus = LOCKED;
          state.loginError = ERROR.LOCK;
        } else {
          state.loginStatus = REJECTED;
          state.loginError = ERROR.LOGIN;
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = PENDING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = FULFILLED;
        state.user.id = action.payload.user.id;
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.user = {
          ...state.user,
          ...action.payload.user,
        };
      })
      .addCase(registerUser.rejected, (state) => {
        state.registerStatus = REJECTED;
        state.registerError = ERROR.REGISTER;
      });
  },
});

const cartSlice = createSlice({
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
        state.isLoading = false;
        state.errorOccurred = false;
        state.totalPrice = action.payload.totalPrice;
        state.totalQuantity = action.payload.totalQuantity;
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
        }
      });
  },
});

const cartReducer = cartSlice.reducer;
const userReducer = userSlice.reducer;

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

const handlersFulfilled = [
  rest.put(`/cart/1`, (req, res, ctx) => {
    serverUser = {
      id: 1,
      cart: req.body.cart,
      isLoading: false,
      errorOccurred: false,
    };

    return res(ctx.json({ id: 1, cart: req.body.cart }), ctx.status(200));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.json(serverUser), ctx.status(200));
  }),
  rest.get('/products/', (req, res, ctx) => {
    const response = [];

    if (req.url.searchParams) {
      req.url.searchParams.forEach((item) => {
        response.push(testProducts[item]);
      });
    }

    return res(ctx.json(response), ctx.status(200));
  }),
];

const serverFulfilled = setupServer(...handlersFulfilled);

describe('CartPage component', () => {
  describe('snapshots', () => {
    it('renders CartPage without data', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<CartPage />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Operations with products in cart', () => {
    beforeEach(() => {
      serverFulfilled.listen();
    });

    afterEach(() => {
      serverFulfilled.close();
    });

    it('should be able to add products', async () => {
      const firstRender = render(
        <Provider store={store}>
          <RouterConnected component={<CartPage />} />
        </Provider>
      );
      const title = await firstRender.findByText('Incredible Plastic Table');

      expect(title).toBeInTheDocument();

      let addButtons = await firstRender.findAllByText('+');

      expect(addButtons.length).toEqual(3);
      addButtons = await firstRender.findAllByText('+');

      fireEvent.click(addButtons[0]);
      addButtons = await firstRender.findAllByText('+');

      const quantity = await firstRender.findByText('2');

      expect(quantity).toBeInTheDocument();
    });

    it('should be able to decrease products', async () => {
      render(
        <Provider store={store}>
          <RouterConnected component={<CartPage />} />
        </Provider>
      );

      const decreaseButtons = await screen.findAllByText('-');

      expect(decreaseButtons.length).toEqual(3);
      let secondTitle = await screen.findByText('Intelligent Cotton Pants');

      expect(secondTitle).toBeInTheDocument();

      fireEvent.click(decreaseButtons[0]);
      const testButton = await screen.findByText('2');

      expect(testButton).toBeInTheDocument();

      secondTitle = await screen.findByText('Incredible Rubber Cheese');
      const allQuantities = await screen.findAllByText('1');

      expect(allQuantities.length).toEqual(3);

      expect(store.getState().cart.products[0].quantity).toEqual(1);
    });

    it('should be able to delete products', async () => {
      render(
        <Provider store={store}>
          <RouterConnected component={<CartPage />} />
        </Provider>
      );

      const allQuantities = await screen.findAllByText('1');

      expect(allQuantities.length).toEqual(3);

      const deleteButtons = await screen.findAllByTestId('cartDeleteButton');

      expect(deleteButtons.length).toEqual(3);
      fireEvent.click(deleteButtons[0]);
      expect(await screen.findByText('No')).toBeInTheDocument();
      fireEvent.click(await screen.findByText('No'));
      expect(screen.queryByText('Yes')).toBe(null);
      fireEvent.click(deleteButtons[0]);
      const agreeButton = await screen.findByText('Yes');

      fireEvent.click(agreeButton);
      let test = await screen.findByText('Intelligent Cotton Pants');
      let test1 = await screen.findByText('Intelligent Cotton Pants');

      expect(test).toBeInTheDocument();
      expect(test1).toBeInTheDocument();

      expect(store.getState().cart.products.length).toEqual(2);
    });

    it('should be able to select products', async () => {
      render(
        <Provider store={store}>
          <RouterConnected component={<CartPage />} />
        </Provider>
      );

      const checkoboxes = await screen.findAllByRole('checkbox');

      expect(checkoboxes.length).toEqual(2);
      fireEvent.click(checkoboxes[0]);
      const test = await screen.findByText('Incredible Rubber Cheese');

      expect(test).toBeInTheDocument();

      const test1 = await screen.findByText('Incredible Plastic Table');

      expect(test1).toBeInTheDocument();

      expect(store.getState().cart.products[0].checked).toEqual(false);
    });

    it('should be able to delete all products', async () => {
      render(
        <Provider store={store}>
          <RouterConnected component={<CartPage />} />
        </Provider>
      );

      const deleteAllButton = await screen.findByText('Empty cart');

      fireEvent.click(deleteAllButton);

      expect(await screen.findByText('Yes')).toBeInTheDocument();

      const confirmButton = await screen.findByText('Yes');

      fireEvent.click(confirmButton);

      expect(await screen.findByText('searching')).toBeInTheDocument();
    });
  });
});
