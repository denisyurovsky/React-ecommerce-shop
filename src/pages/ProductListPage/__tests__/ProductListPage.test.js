import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import categoriesData from '../../../test-utils/dto/categoriesDto';
import cardsData from '../../../test-utils/dto/productsDto';
import renderWithStore, { screen } from '../../../test-utils/renderWithStore';
import RouterConnected from '../../../test-utils/RouterConnected';
import ProductListPage from '../ProductListPage';

const handlersFulfilled = [
  rest.get('/categories', (req, res, ctx) => {
    return res(ctx.json(categoriesData));
  }),
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json(cardsData), ctx.set('x-total-count', 6));
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
      const { asFragment } = renderWithStore(
        <RouterConnected component={<ProductListPage />} />
      );

      await screen.findByText(/Found: 6 items/i);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should get data from server', async () => {
      renderWithStore(<RouterConnected component={<ProductListPage />} />);
      expect(
        screen.getByRole('progressbar', { name: /products preloader/i })
      ).toBeInTheDocument();

      expect(
        await screen.findByText(/Intelligent Cotton Pants/i)
      ).toBeInTheDocument();
    });

    it('should switch shape properly', () => {
      renderWithStore(<RouterConnected component={<ProductListPage />} />);
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
      const { asFragment } = renderWithStore(
        <RouterConnected component={<ProductListPage />} />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('Get error from server', async () => {
      renderWithStore(<RouterConnected component={<ProductListPage />} />);

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
      renderWithStore(<RouterConnected component={<ProductListPage />} />);

      await screen.findByText(/There are no products/i);

      expect(screen.queryByTestId('ViewModuleIcon')).toBeNull();
      expect(screen.queryByTestId('ViewListIcon')).toBeNull();
    });
  });
});
