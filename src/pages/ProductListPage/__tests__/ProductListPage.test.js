import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import categoriesData from '../../../test-utils/dto/categoriesDto';
import cardsData from '../../../test-utils/dto/productsDto';
import usersDto from '../../../test-utils/dto/usersDto';
import renderWith, { screen } from '../../../test-utils/renderWith';
import ProductListPage from '../ProductListPage';

const preloadedState = {
  cart: {
    sellers: {},
    totalPrice: 0,
    totalQuantity: 0,
  },
  user: usersDto[0],
  categories: {
    data: [],
    isLoading: false,
    errorOccurred: false,
    errorMessage: '',
  },
};

const handlersFulfilled = [
  rest.get('/categories', (req, res, ctx) => {
    return res(ctx.json(categoriesData));
  }),
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json(cardsData.slice(0, 2)), ctx.set('x-total-count', 2));
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
  describe('Render with data', () => {
    beforeAll(() => serverFulfilled.listen());
    afterAll(() => serverFulfilled.close());

    it('should render a valid snapshot', async () => {
      const { asFragment } = renderWith(<ProductListPage />, preloadedState);

      await screen.findByText(/Found: 2 items/i);

      expect(asFragment()).toMatchSnapshot();
    });

    it('Get data from server', async () => {
      renderWith(<ProductListPage />, preloadedState);

      expect(
        await screen.findByText(/Intelligent Cotton Pants/i)
      ).toBeInTheDocument();
    });

    it('should switch shape properly', () => {
      renderWith(<ProductListPage />);

      const listButton = screen.getByRole('button', { name: /list/i });
      const moduleButton = screen.getByRole('button', { name: /module/i });

      expect(listButton).toHaveAttribute('aria-pressed', 'true');
      expect(moduleButton).toHaveAttribute('aria-pressed', 'false');
      userEvent.click(moduleButton);
      expect(listButton).toHaveAttribute('aria-pressed', 'false');
      expect(moduleButton).toHaveAttribute('aria-pressed', 'true');
      userEvent.click(moduleButton);
      expect(listButton).toHaveAttribute('aria-pressed', 'false');
      expect(moduleButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Render without data', () => {
    beforeAll(() => serverRejected.listen());
    afterAll(() => serverRejected.close());

    it('should render a valid snapshot', () => {
      const { asFragment } = renderWith(<ProductListPage />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('Get error from server', async () => {
      renderWith(<ProductListPage />);

      expect(
        screen.getByRole('progressbar', { name: /products preloader/i })
      ).toBeInTheDocument();
      expect(
        await screen.findByText(/There are no products/i)
      ).toBeInTheDocument();
    });
  });

  describe('Resize events', () => {
    beforeAll(() => {
      serverRejected.listen();
      window.innerWidth = 500;
      window.dispatchEvent(new Event('resize'));
    });

    afterAll(() => {
      serverRejected.close();
      window.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
    });

    it('should react on resize', async () => {
      renderWith(<ProductListPage />);

      await screen.findByText(/There are no products/i);

      expect(screen.queryByTestId('ViewModuleIcon')).toBeNull();
      expect(screen.queryByTestId('ViewListIcon')).toBeNull();
    });
  });
});
