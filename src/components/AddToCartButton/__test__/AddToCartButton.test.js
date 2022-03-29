import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { testCart } from '../../../test-utils/dto/cartDto';
import testCards from '../../../test-utils/dto/productsDto';
import { userDto } from '../../../test-utils/dto/userDto';
import renderWith, { screen } from '../../../test-utils/renderWith';
import { AddToCartButton } from '../AddToCartButton';

const serverUser = {
  ...userDto,
};

const initialUser = {
  user: {
    id: 1,
  },
};

const preloadedState = {
  user: initialUser,
  cart: testCart,
};

const successfulHandlers = [
  rest.put('/cart', (req, res, ctx) => {
    serverUser.cart = req.body.cart;

    return res(ctx.status(200), ctx.json(serverUser));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(serverUser));
  }),
];

describe('AddToCartButton component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = renderWith(
        <AddToCartButton product={testCards[0]} />,
        preloadedState
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('valid behaviour of buttons when server responds', () => {
    const server = setupServer(...successfulHandlers);

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    beforeEach(() => {
      renderWith(<AddToCartButton product={testCards[2]} />, preloadedState);
    });

    it('reacts on + clicks correctly', async () => {
      userEvent.click(await screen.findByText('+ add to cart'));

      expect(await screen.findByText('1')).toBeInTheDocument();
    });

    it('reacts on - clicks correctly', async () => {
      userEvent.click(await screen.findByText('+ add to cart'));
      userEvent.click(await screen.findByText('+'));

      expect(await screen.findByText('2')).toBeInTheDocument();

      userEvent.click(await screen.findByText('-'));

      expect(await screen.findByText('1')).toBeInTheDocument();
    });
  });
});
