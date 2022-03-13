import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { categories } from '../../../../test-utils/dto/categoriesDto';
import { productForPDP } from '../../../../test-utils/dto/productsDto';
import renderWith, {
  screen,
  fireEvent,
  createEvent,
  getByRole,
  waitFor,
} from '../../../../test-utils/renderWith';
import { CreateOrEditProductPage } from '../CreateOrEditProductPage';

const preloadedState = {
  categories: {
    data: categories.map((el) => el.name),
  },
};

const successfullHandlers = [
  rest.get('/categories', (_, res, ctx) => {
    return res(ctx.json(categories));
  }),
  rest.get('/users', (req, res, ctx) => {
    if (req.url.searchParams.get('id') != 1) {
      return res(ctx.status(400));
    }

    return res(ctx.json([{ firstName: 'Lindsay', lastName: 'Yundt' }]));
  }),
  rest.get('/products/0', (_, res, ctx) => res(ctx.json(productForPDP))),
  rest.patch('/products/0', (_, res, ctx) => res(ctx.status(200))),
  rest.post('/products', (_, res, ctx) => res(ctx.status(201))),
];

const errorHandlers = [
  ...successfullHandlers.slice(0, successfullHandlers.length - 2),
  rest.patch('/products/0', (_, res, ctx) =>
    res(ctx.status(403), ctx.json({}))
  ),
  rest.post('/products', (_, res, ctx) => res(ctx.status(403), ctx.json({}))),
];

const getTextArea = () =>
  getByRole(screen.getByText(/description/i).parentNode, 'textbox');

const pasteText = (text) =>
  createEvent.paste(getTextArea(), {
    clipboardData: {
      types: ['text/plain'],
      getData: () => text,
    },
  });

const fillMandatoryFields = () => {
  userEvent.type(screen.getByLabelText(/name/i), 'name');

  userEvent.click(screen.getByLabelText(/category/i));
  userEvent.click(screen.getByText('Grocery'));

  fireEvent(getTextArea(), pasteText('description'));

  userEvent.type(screen.getByLabelText(/^price/i), '690');
};

describe('Successful response', () => {
  const server = setupServer(...successfullHandlers);

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  describe('after editing', () => {
    beforeEach(() =>
      renderWith(
        <CreateOrEditProductPage />,
        preloadedState,
        'admin/products/:id/edit',
        ['/admin/products/0/edit']
      )
    );

    it('should show loading icon', async () => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();

      await screen.findByLabelText(/^name$/i);
    });

    it('should show confirmation message after submit', async () => {
      const input = await screen.findByLabelText(/^name$/i);

      userEvent.type(input, 'a{backspace}');
      userEvent.click(screen.getByRole('button', { name: /^edit$/i }));

      await screen.findByRole('alert');

      expect(
        screen.getByText('Product was successfully edited')
      ).toBeInTheDocument();
    });

    it('should navigate to /admin/products after cancel', async () => {
      await screen.findByLabelText(/^name$/i);

      userEvent.click(screen.getByRole('button', { name: /^cancel$/i }));

      await waitFor(() =>
        expect(window.location.pathname).toBe('/admin/products')
      );
    });
  });

  describe('after creation', () => {
    beforeEach(() =>
      renderWith(
        <CreateOrEditProductPage />,
        preloadedState,
        'admin/products/create',
        ['/admin/products/create']
      )
    );

    it('should show create new product title on cretion page', async () => {
      expect.assertions(2);

      await screen.findByLabelText(/^name$/i);

      fillMandatoryFields();
      userEvent.click(screen.getByRole('button', { name: /^create$/i }));

      await screen.findByRole('alert');

      expect(
        screen.getByText('Product was successfully created')
      ).toBeInTheDocument();

      await waitFor(() => expect(window.location.pathname).toBe('/admin'));
    });
  });
});

describe('errors in response', () => {
  const server = setupServer(...errorHandlers);

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  describe('during creation', () => {
    beforeEach(() =>
      renderWith(
        <CreateOrEditProductPage />,
        preloadedState,
        'admin/products/create',
        ['/admin/products/create']
      )
    );

    it('should notify about errors', async () => {
      expect.assertions(2);

      await screen.findByLabelText(/^name$/i);

      fillMandatoryFields();
      userEvent.click(screen.getByRole('button', { name: /^create$/i }));

      await screen.findByRole('alert');

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      await waitFor(() => expect(window.location.pathname).toBe('/admin'));
    });
  });

  describe('during editing', () => {
    beforeEach(() =>
      renderWith(
        <CreateOrEditProductPage />,
        preloadedState,
        'admin/products/:id/edit',
        ['/admin/products/0/edit']
      )
    );

    it('should notify about errors', async () => {
      expect.assertions(2);

      const input = await screen.findByLabelText(/^name$/i);

      userEvent.type(input, 'a{backspace}');
      userEvent.click(screen.getByRole('button', { name: /^edit$/i }));

      await screen.findByRole('alert');

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      await waitFor(() => expect(window.location.pathname).toBe('/admin'));
    });
  });
});
