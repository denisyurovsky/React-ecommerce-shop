import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { testCart } from '../../../test-utils/dto/cartDto';
import testCards from '../../../test-utils/dto/productsDto';
import { userDto } from '../../../test-utils/dto/userDto';
import renderWith from '../../../test-utils/renderWith';
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
  rest.put('/cart/1', (req, res, ctx) => {
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

    beforeAll(() => {
      server.listen();
    });
    afterAll(() => server.close());
    it('reacts on + clicks correctly', async () => {
      renderWith(<AddToCartButton product={testCards[2]} />, preloadedState);

      const addButton = await screen.findByText('+ add to cart');

      fireEvent.click(addButton);
      const valueFromServer = await screen.findByText('1');

      expect(valueFromServer).toBeInTheDocument();
    });

    it('reacts on - clicks correctly', async () => {
      renderWith(<AddToCartButton product={testCards[2]} />, preloadedState);

      const addButton = await screen.findByText('+ add to cart');

      fireEvent.click(addButton);

      const secondAddButton = await screen.findByText('+');

      fireEvent.click(secondAddButton);

      expect(await screen.findByText('2')).toBeInTheDocument();
      const decreaseButton = await screen.findByText('-');

      fireEvent.click(decreaseButton);

      expect(await screen.findByText('1')).toBeInTheDocument();
    });
  });
});
