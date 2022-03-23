import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { testCart } from '../../../../test-utils/dto/cartDto';
import cardsData from '../../../../test-utils/dto/productsDto';
import users from '../../../../test-utils/dto/usersDto';
import render, { screen } from '../../../../test-utils/renderWith';
import ProfileSeller from '../ProfileSeller';

describe('ProfileSeller component', () => {
  it('should get data from server', async () => {
    const server = setupServer(
      rest.get('/products', (req, res, ctx) => {
        return res(ctx.json(cardsData));
      })
    );

    server.listen();
    render(<ProfileSeller profileId={3} />, {
      cart: testCart,
      user: users[1],
    });

    expect(
      screen.getByRole('progressbar', { name: /products preloader/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/Intelligent Cotton Pants/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('progressbar', { name: /products preloader/i })
    ).not.toBeInTheDocument();

    server.close();
  });

  it('should get error from server', async () => {
    const server = setupServer(
      rest.get('/products', (req, res, ctx) => {
        return res(ctx.status(403));
      })
    );

    server.listen();
    render(<ProfileSeller profileId={3} />, {
      cart: testCart,
      user: users[1],
    });

    expect(
      screen.getByRole('progressbar', { name: /products preloader/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/There are no products/i)
    ).toBeInTheDocument();

    server.close();
  });
});
