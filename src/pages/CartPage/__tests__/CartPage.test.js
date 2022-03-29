import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { cartItems } from '../../../test-utils/dto/cartDto';
import testProducts from '../../../test-utils/dto/productsDto';
import { userDto as serverUser } from '../../../test-utils/dto/userDto';
import renderWith, { waitFor, screen } from '../../../test-utils/renderWith';
import { CartPage } from '../CartPage';

const stateForTests = {
  user: { user: { id: 0 } },
  cart: cartItems,
};

const handlersFulfilled = [
  rest.delete('/cart', (req, res, ctx) => res(ctx.json({}))),
  rest.put(`/cart`, (req, res, ctx) => {
    return res(ctx.json({ id: 0, cart: req.body.cart }), ctx.status(200));
  }),
  rest.get('/users/:userId', (req, res, ctx) => {
    const { userId } = req.params;

    if (Number(userId) === 0) {
      return res(ctx.json(serverUser));
    }

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

beforeAll(() => serverFulfilled.listen());
afterAll(() => serverFulfilled.close());

const awaitCart = async () => {
  await waitFor(() => {
    expect(screen.queryAllByTestId('cartDeleteButton')).toHaveLength(5);
  });
};

describe('CartPage component', () => {
  beforeEach(() => serverFulfilled.listen());
  afterEach(() => serverFulfilled.close());

  describe('snapshots', () => {
    it('renders CartPage without data', () => {
      const { asFragment } = renderWith(<CartPage />, stateForTests, '/cart', [
        '/cart',
      ]);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Operations with products in cart', () => {
    beforeEach(async () => {
      renderWith(<CartPage />, stateForTests, '/cart', ['/cart']);
      await awaitCart();
    });

    it('should be able to add products', async () => {
      userEvent.click(screen.queryAllByText('+')[0]);

      expect(screen.getByTestId('SaveIcon')).toBeInTheDocument();
      expect(await screen.findByText('2')).toBeInTheDocument();
    });

    it('should be able to decrease products', async () => {
      userEvent.click(screen.queryAllByText('-')[0]);

      expect(screen.getByTestId('SaveIcon')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryAllByTestId('cartDeleteButton')).toHaveLength(4);
      });
    });

    it('should be able to delete products', async () => {
      userEvent.click(screen.queryAllByTestId('cartDeleteButton')[0]);
      userEvent.click(await screen.findByText('Yes'));

      await waitFor(() => {
        expect(screen.queryAllByTestId('cartDeleteButton')).toHaveLength(4);
      });
    });

    it('should be able to select products', async () => {
      userEvent.click(screen.queryAllByRole('checkbox')[1]);

      await waitFor(() => {
        expect(
          screen.queryAllByTestId('CheckBoxOutlineBlankIcon')
        ).toHaveLength(1);
      });
    });

    it('should be able to delete all products', async () => {
      userEvent.click(screen.getByText('Empty cart'));

      const confirmButton = await screen.findByText('Yes');

      expect(confirmButton).toBeInTheDocument();
      userEvent.click(confirmButton);

      await waitFor(() => {
        expect(
          screen.getByText('searching', { exact: false })
        ).toBeInTheDocument();
      });
    });
  });
});
