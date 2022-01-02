import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import categoriesData from '../../../test-utils/dto/categoriesDto';
import cardsData from '../../../test-utils/dto/productsDto';
import render, { screen } from '../../../test-utils/renderWithStore';
import RouterConnected from '../../../test-utils/RouterConnected';
import ProductListPage from '../ProductListPage';

const handlersFulfilled = [
  rest.get('/categories', (req, res, ctx) => {
    return res(ctx.json(categoriesData), ctx.delay(150));
  }),
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json(cardsData), ctx.delay(150));
  }),
];

const handlersRejected = [
  rest.get('/categories', (req, res, ctx) => {
    return res(ctx.status(403));
  }),
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(403));
  }),
];

const serverFulfilled = setupServer(...handlersFulfilled);

const serverRejected = setupServer(...handlersRejected);

describe('ProductListPage component', () => {
  it('Get data from server', async () => {
    serverFulfilled.listen();
    render(<RouterConnected component={<ProductListPage />} />);

    expect(
      screen.getByRole('progressbar', { name: /products preloader/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Intelligent Cotton Pants/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('progressbar', { name: /products preloader/i })
    ).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: /all categories/i });

    userEvent.click(button);
    expect(
      screen.getByRole('option', { name: /computers/i })
    ).toBeInTheDocument();

    serverFulfilled.resetHandlers();
    serverFulfilled.close();
  });

  it('Get error from server', async () => {
    serverRejected.listen();

    render(<ProductListPage />);

    expect(
      screen.getByRole('progressbar', { name: /products preloader/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/There are no products/i)
    ).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /all categories/i });

    expect(button).toHaveAttribute('aria-disabled', 'true');

    serverRejected.resetHandlers();
    serverRejected.close();
  });
});
