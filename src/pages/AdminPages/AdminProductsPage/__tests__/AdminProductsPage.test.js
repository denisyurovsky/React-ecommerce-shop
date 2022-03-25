import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import feedbackDto from '../../../../test-utils/dto/feedbackDto';
import cardsData from '../../../../test-utils/dto/productsDto';
import renderWithStore, {
  screen,
} from '../../../../test-utils/renderWithStore';
import RouterConnected from '../../../../test-utils/RouterConnected';
import { Role } from '../../../../ts/enums/enums';
import { AdminProductsPage } from '../AdminProductsPage';

const productsRequest = rest.get('/products', (req, res, ctx) => {
  return res(ctx.json(cardsData));
});

const feedbacksRequest = rest.get('/feedbacks', (req, res, ctx) => {
  return res(ctx.json(feedbackDto));
});

const deleteProductRequest = rest.delete('/products/0', (req, res, ctx) => {
  return res(ctx.status(200));
});

const serverFulfilled = setupServer(
  productsRequest,
  feedbacksRequest,
  deleteProductRequest
);

const waitForTable = async () => screen.findByRole('grid');

const waitForDeleteButton = async () => screen.findAllByText('Delete');

describe('AdminProductsPage tests', () => {
  beforeAll(() => serverFulfilled.listen());
  afterAll(() => serverFulfilled.close());

  it('should take snapshot', async () => {
    const { asFragment } = renderWithStore(
      <RouterConnected component={<AdminProductsPage />} />,
      { role: Role.Seller }
    );

    await waitForTable();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should show products data', async () => {
    renderWithStore(<RouterConnected component={<AdminProductsPage />} />, {
      role: Role.Seller,
    });

    await waitForTable();

    expect(
      await screen.findByText(/Intelligent Cotton Pants/i)
    ).toBeInTheDocument();
  });

  it('should open modal and show notification after successful product delete response', async () => {
    renderWithStore(<RouterConnected component={<AdminProductsPage />} />, {
      role: Role.Seller,
    });

    await waitForTable();

    await waitForDeleteButton();

    const deleteModalButtons = await screen.findAllByText('Delete');

    userEvent.click(deleteModalButtons[0]);

    const modal = await screen.findAllByRole('presentation');

    expect(modal[0]).toBeInTheDocument();

    userEvent.click(await screen.findByText(/Yes, remove/i));

    expect(
      await screen.findByText('Product was successfully deleted')
    ).toBeInTheDocument();
  });
});
