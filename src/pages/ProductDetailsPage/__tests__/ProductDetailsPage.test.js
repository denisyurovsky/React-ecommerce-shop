import { configureStore } from '@reduxjs/toolkit';
import { waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';

import cartReducer from '../../../store/cart/cartSlice';
import categoriesReducer from '../../../store/categories/categoriesSlice';
import feedbackReducer from '../../../store/feedback/feedbackSlice';
import productsReducer from '../../../store/products/productsSlice';
import userReducer from '../../../store/user/userSlice';
import { testCart } from '../../../test-utils/dto/cartDto';
import { productForPDP } from '../../../test-utils/dto/productsDto';
import users from '../../../test-utils/dto/usersDto';
import renderWithStore, { screen } from '../../../test-utils/renderWithStore';
import { ProductDetailsPage } from '../ProductDetailsPage';

const handlersFulfilled = [
  rest.get('/products/1', (req, res, ctx) => res(ctx.json(productForPDP))),
  rest.get('/feedbacks', (req, res, ctx) => res(ctx.json([]))),
  rest.get('/users', (req, res, ctx) => {
    const id = req.url.searchParams.get('id');

    if (id == 1) {
      return res(
        ctx.json([
          {
            firstName: 'Lindsay',
            lastName: 'Yundt',
          },
        ]),
        ctx.delay(150)
      );
    }

    return res(ctx.status(400));
  }),
];

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    categories: categoriesReducer,
    feedback: feedbackReducer,
    user: userReducer,
  },
  preloadedState: {
    cart: testCart,
    user: users[1],
  },
});

const handlersRejected = rest.get('/products/1', (req, res, ctx) =>
  res(ctx.status(500))
);

const serverFulfilled = setupServer(...handlersFulfilled);
const serverRejected = setupServer(handlersRejected);

describe('ProductDetailsPage component', () => {
  it('Get data from server', async () => {
    serverFulfilled.listen();

    renderWithStore(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>,
      { store }
    );

    await waitFor(async () => {
      const nameTexts = await screen.findAllByText('Intelligent Cotton Pants');

      expect(nameTexts[0]).toBeInTheDocument();
    });

    serverFulfilled.close();
  });

  it('handlers server error', async () => {
    serverRejected.listen();

    renderWithStore(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>,
      { store }
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(await screen.findByText(/oooops!/i)).toBeInTheDocument();

    serverRejected.close();
  });
});
