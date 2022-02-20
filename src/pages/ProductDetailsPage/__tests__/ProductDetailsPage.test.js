import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';

import { productForPDP } from '../../../test-utils/dto/productsDto';
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
      </MemoryRouter>
    );

    expect(screen.getByTestId('load')).toBeInTheDocument();

    expect(
      await screen.findAllByText(/Intelligent Cotton Pants/i)
    ).toHaveLength(2);

    serverFulfilled.close();
  });

  it('handlers server error', async () => {
    serverRejected.listen();

    renderWithStore(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('load')).toBeInTheDocument();

    expect(await screen.findByText(/Page Not Found/i)).toBeInTheDocument();

    serverRejected.close();
  });
});
