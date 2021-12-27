import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Route, Routes, MemoryRouter } from 'react-router-dom';

import productsDto from '../../../test-utils/dto/productsDto';
import { ProductDetailsPage } from '../ProductDetailsPage';

const handlersFulfilled = rest.get('/products/1', (req, res, ctx) => {
  return res(ctx.json(productsDto[0]), ctx.delay(150));
});

const handlersRejected = rest.get('/products/1', (req, res, ctx) => {
  return res(ctx.status(500));
});

const serverFulfilled = setupServer(handlersFulfilled);
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
