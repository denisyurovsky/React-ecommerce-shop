import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Provider } from 'react-redux';

import cartReducer from '../../../store/cart/cartSlice';
import userReducer from '../../../store/user/userSlice';
import testProducts from '../../../test-utils/dto/productsDto';
import renderWith from '../../../test-utils/renderWith';
import renderWithStore from '../../../test-utils/renderWithStore';
import RouterConnected from '../../../test-utils/RouterConnected';
import { CartPage } from '../CartPage';

let initialCart = {
  sellers: {
    1: {
      products: [
        {
          userId: 1,
          productId: testProducts[0].id,
          price: testProducts[0].price,
          quantity: 1,
          checked: true,
        },
      ],
      checked: true,
    },
    2: {
      products: [
        {
          userId: 2,
          productId: testProducts[1].id,
          price: testProducts[1].price,
          quantity: 1,
          checked: true,
        },
      ],
      checked: true,
    },
    3: {
      products: [
        {
          userId: 3,
          productId: testProducts[2].id,
          price: testProducts[2].price,
          quantity: 1,
          checked: true,
        },
      ],
      checked: true,
    },
  },
  totalQuantity: 3,
  totalPrice:
    testProducts[0].price + testProducts[1].price + testProducts[2].price,
  isLoading: false,
  errorOccurred: false,
};

let serverUser = {
  id: 1,
  cart: {
    sellers: {
      1: {
        products: [
          {
            userId: 1,
            productId: testProducts[0].id,
            price: testProducts[0].price,
            quantity: 1,
            checked: true,
          },
        ],
        checked: true,
      },
      2: {
        products: [
          {
            userId: 2,
            productId: testProducts[1].id,
            price: testProducts[1].price,
            quantity: 1,
            checked: true,
          },
        ],
        checked: true,
      },
      3: {
        products: [
          {
            userId: 3,
            productId: testProducts[2].id,
            price: testProducts[2].price,
            quantity: 1,
            checked: true,
          },
        ],
        checked: true,
      },
    },
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
  user: { id: 0 },
};

const stateForTests = {
  user: initialUser,
  cart: initialCart,
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  preloadedState: stateForTests,
});

const handlersFulfilled = [
  rest.put(`/cart/:userId`, (req, res, ctx) => {
    const { userId } = req.params;

    serverUser = {
      id: userId,
      cart: req.body.cart,
      isLoading: false,
      errorOccurred: false,
    };

    return res(ctx.json({ id: userId, cart: req.body.cart }), ctx.status(200));
  }),
  rest.get('/users/:0', (req, res, ctx) => {
    return res(
      ctx.json({
        ...serverUser,
        firstName: `My firstName`,
        lastName: `My lastName`,
      }),
      ctx.status(200)
    );
  }),
  rest.get('/users/:userId', (req, res, ctx) => {
    const { userId } = req.params;

    return res(
      ctx.json({
        id: userId,
        firstName: `${userId} firstName`,
        lastName: `${userId} lastName`,
      }),
      ctx.status(200)
    );
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
  beforeEach(() => serverFulfilled.listen());
  afterEach(() => serverFulfilled.close());

  describe('snapshots', () => {
    it('renders CartPage without data', () => {
      const { asFragment } = renderWithStore(
        <RouterConnected component={<CartPage />} />,
        { store }
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Operations with products in cart', () => {
    it('should be able to add products', async () => {
      const addRender = renderWith(<CartPage />, stateForTests);
      const title = await addRender.findByText('Incredible Plastic Table');

      await waitFor(() => {
        expect(title).toBeInTheDocument();
      });

      const decreaseButtons = await addRender.findAllByText('-');

      await waitFor(() => {
        expect(decreaseButtons.length).toEqual(3);
      });

      let addButtons = await addRender.findAllByText('+');

      expect(addButtons.length).toEqual(3);
      addButtons = await addRender.findAllByText('+');

      fireEvent.click(addButtons[0]);
      addButtons = await addRender.findAllByText('+');
      expect(screen.getByTestId('SaveIcon')).toBeInTheDocument();

      const quantity = await addRender.findByText('2');

      expect(quantity).toBeInTheDocument();
    });

    it('should be able to decrease products', async () => {
      const decreaseRender = renderWith(<CartPage />, stateForTests);

      const title = await decreaseRender.findByText('Incredible Plastic Table');

      await waitFor(() => {
        expect(title).toBeInTheDocument();
      });

      const decreaseButtons = await decreaseRender.findAllByText('-');

      await waitFor(() => {
        expect(decreaseButtons.length).toEqual(3);
      });

      let secondTitle = await decreaseRender.findByText(
        'Intelligent Cotton Pants'
      );

      expect(secondTitle).toBeInTheDocument();

      fireEvent.click(decreaseButtons[0]);
      expect(screen.getByTestId('SaveIcon')).toBeInTheDocument();
      const testButton = await screen.findAllByText('1');

      expect(testButton).toHaveLength(2);

      secondTitle = await decreaseRender.findByText('Incredible Rubber Cheese');
      const allQuantities = await decreaseRender.findAllByText('1');

      expect(allQuantities.length).toEqual(3);
    });

    it('should be able to delete products', async () => {
      const deleteRender = renderWithStore(
        <RouterConnected component={<CartPage />} />,
        { store }
      );

      const title = await deleteRender.findByText('Incredible Plastic Table');

      await waitFor(() => {
        expect(title).toBeInTheDocument();
      });

      const allQuantities = await deleteRender.findAllByText('1');

      expect(allQuantities.length).toEqual(3);

      const deleteButtons = await deleteRender.findAllByTestId(
        'cartDeleteButton'
      );

      expect(deleteButtons.length).toEqual(3);
      fireEvent.click(deleteButtons[0]);
      expect(await deleteRender.findByText('No')).toBeInTheDocument();
      fireEvent.click(await deleteRender.findByText('No'));
      expect(deleteRender.queryByText('Yes')).toBe(null);
      fireEvent.click(deleteButtons[0]);
      const agreeButton = await deleteRender.findByText('Yes');

      fireEvent.click(agreeButton);

      await waitFor(() => {
        expect(Object.keys(store.getState().cart.sellers).length).toBe(2);
      });
    });

    it('should be able to select products', async () => {
      const selectRender = render(
        <Provider store={store}>
          <RouterConnected component={<CartPage />} />
        </Provider>
      );

      const title = await selectRender.findByText('Incredible Plastic Table');

      await waitFor(() => {
        expect(title).toBeInTheDocument();
      });

      const checkoboxes = await selectRender.findAllByRole('checkbox');

      expect(checkoboxes.length).toEqual(4);
      fireEvent.click(checkoboxes[1]);

      await waitFor(() => {
        expect(store.getState().cart.sellers[2].products[0].checked).toEqual(
          false
        );
      });

      fireEvent.click(checkoboxes[2]);
      await waitFor(() => {
        expect(store.getState().cart.sellers[2].products[0].checked).toEqual(
          false
        );
      });
    });

    it('should be able to delete all products', async () => {
      const deleteAll = renderWith(<CartPage />, stateForTests);

      const deleteAllButton = await deleteAll.findByText('Empty cart');

      fireEvent.click(deleteAllButton);

      expect(await deleteAll.findByText('Yes')).toBeInTheDocument();

      const confirmButton = await deleteAll.findByText('Yes');

      fireEvent.click(confirmButton);

      expect(await deleteAll.findByText('searching')).toBeInTheDocument();
    });
  });
});
