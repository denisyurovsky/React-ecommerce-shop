import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import productsDto from '../../../../test-utils/dto/productsDto';
import renderWithStore, {
  screen,
} from '../../../../test-utils/renderWithStore';
import RouterConnected from '../../../../test-utils/RouterConnected';
import { Role } from '../../../../ts/enums/enums';
import { AdminCategoriesPage } from '../AdminCategoriesPage';

const productsRequest = rest.get('/products/?userId=1', (req, res, ctx) => {
  return res(ctx.json(productsDto));
});

const deleteCategoryRequest = rest.delete(
  '/categories/Home',
  (req, res, ctx) => {
    return res(ctx.status(200));
  }
);

const serverFulfilled = setupServer(productsRequest, deleteCategoryRequest);

const waitForTable = () => screen.findByRole('grid');

const waitForDeleteButton = () => screen.findAllByText('Delete');

describe('AdminCategoriesPage tests', () => {
  beforeEach(() => serverFulfilled.listen());
  afterEach(() => serverFulfilled.close());

  it('should take snapshot', async () => {
    const { asFragment } = renderWithStore(
      <RouterConnected component={<AdminCategoriesPage />} />,
      { role: Role.Seller }
    );

    await waitForTable();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should show products data', async () => {
    renderWithStore(<RouterConnected component={<AdminCategoriesPage />} />, {
      role: Role.Seller,
    });

    await waitForTable();

    expect(await screen.findByText(/Home/i)).toBeInTheDocument();
  });

  it('should open modal and show notification after successful category delete response', async () => {
    renderWithStore(<RouterConnected component={<AdminCategoriesPage />} />, {
      role: Role.Seller,
    });

    await waitForTable();

    await waitForDeleteButton();

    const deleteModalButtons = await screen.findAllByText('Delete');

    fireEvent.click(deleteModalButtons[0]);

    const modal = await screen.findAllByRole('presentation');

    expect(modal[0]).toBeInTheDocument();

    userEvent.click(await screen.findByText(/Yes, remove all/i));

    expect(
      await screen.findByText(
        'Category and related products were successfully deleted'
      )
    ).toBeInTheDocument();
  });
});
