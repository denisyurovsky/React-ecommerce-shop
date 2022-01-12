import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';

import { productForPDP } from '../../../test-utils/dto/productsDto';
import { ProductDetailsPage } from '../ProductDetailsPage';

const handlersFulfilled = [
  rest.get('/products/1', (req, res, ctx) => {
    return res(ctx.json(productForPDP), ctx.delay(150));
  }),
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

const handlersRejected = rest.get('/products/1', (req, res, ctx) => {
  return res(ctx.status(500));
});

const serverFulfilled = setupServer(...handlersFulfilled);
const serverRejected = setupServer(handlersRejected);

describe('ProductDetailsPage component', () => {
  it('Get data from server', async () => {
    serverFulfilled.listen();

    render(
      <MemoryRouter initialEntries={['/product/1']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('load')).toBeInTheDocument();

    expect(
      await screen.findByText(/Intelligent Cotton Pants/i)
    ).toBeInTheDocument();

    serverFulfilled.close();
  });

  it('handlers server error', async () => {
    serverRejected.listen();

    render(
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
