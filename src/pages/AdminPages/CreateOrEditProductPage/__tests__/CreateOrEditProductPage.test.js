import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { categories } from '../../../../test-utils/dto/categoriesDto';
import { productForPDP } from '../../../../test-utils/dto/productsDto';
import render, {
  screen,
  within,
  fireEvent,
  createEvent,
  getByRole,
} from '../../../../test-utils/renderWithStore';
import { CreateOrEditProductPage } from '../CreateOrEditProductPage';

const getTextArea = () =>
  getByRole(screen.getByText(/description/i).parentNode, 'textbox');
const pasteText = (text) =>
  createEvent.paste(getTextArea(), {
    clipboardData: {
      types: ['text/plain'],
      getData: () => text,
    },
  });

const handlersFulfilled = rest.get('/categories', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(categories));
});

const getProductInfo = rest.get('/products/0', (req, res, ctx) => {
  return res(ctx.json(productForPDP));
});

const getUserId = rest.get('/users', (req, res, ctx) => {
  const id = req.url.searchParams.get('id');

  if (id == 1) {
    return res(
      ctx.json([
        {
          firstName: 'Lindsay',
          lastName: 'Yundt',
        },
      ])
    );
  }

  return res(ctx.status(400));
});

const putProductResponse200 = rest.patch('/products/0', (req, res, ctx) => {
  return res(ctx.status(200));
});

const postNewProductResponse201 = rest.post('/products', (req, res, ctx) => {
  return res(ctx.status(201));
});

const serverCategoriesRequest = setupServer(
  handlersFulfilled,
  getUserId,
  getProductInfo,
  putProductResponse200,
  postNewProductResponse201
);

describe('CreateOrEditProductPage snapshot', () => {
  it('should take a snapshot with predefined data', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/admin/products/0/edit']}>
        <Routes>
          <Route
            path="admin/products/:id/edit"
            element={<CreateOrEditProductPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

beforeAll(() => {
  serverCategoriesRequest.listen();
});

afterAll(() => {
  serverCategoriesRequest.close();
});

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={['/admin/products/0/edit']}>
      <Routes>
        <Route
          path="admin/products/:id/edit"
          element={<CreateOrEditProductPage />}
        />
      </Routes>
    </MemoryRouter>
  );
});

describe('successful scenarios', () => {
  it('renders createProductPage, if all fields valid, sends data to server', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="admin/products/create"
            element={<CreateOrEditProductPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    const nameInput = await screen.findByLabelText('Name');
    const discountPriceInput = await screen.findByLabelText('Discount price');
    const priceInput = await screen.findByLabelText('Price');
    const editButton = screen.getByText('Edit');

    userEvent.type(nameInput, 'something');

    const selectLabel = /Category/i;
    const selectEl = await screen.findByLabelText(selectLabel);

    expect(selectEl).toBeInTheDocument();

    userEvent.click(selectEl);

    const optionsPopupEl = await screen.findByRole('listbox', {
      name: selectLabel,
    });

    userEvent.click(within(optionsPopupEl).getByText('Grocery'));
    fireEvent(getTextArea(), pasteText('something'));
    userEvent.type(priceInput, '1337');
    userEvent.type(discountPriceInput, '11237467');
    userEvent.click(editButton);
    expect(screen.getByTestId('load')).toBeInTheDocument();
  });
  it('renders product data and shows in UI', async () => {
    expect(
      await screen.findByDisplayValue(/Intelligent Cotton Pants/i)
    ).toBeInTheDocument();
  });

  it('renders categories and shows in UI', async () => {
    const nameInput = await screen.findByLabelText('Name');
    const discountPriceInput = await screen.findByLabelText('Discount price');
    const priceInput = await screen.findByLabelText('Price');
    const editButton = screen.getByText('Edit');

    userEvent.type(nameInput, 'something');

    const selectLabel = /Category/i;
    const selectEl = await screen.findByLabelText(selectLabel);

    expect(selectEl).toBeInTheDocument();

    userEvent.click(selectEl);

    expect(screen.getByText('Grocery')).toBeInTheDocument();

    const optionsPopupEl = await screen.findByRole('listbox', {
      name: selectLabel,
    });

    userEvent.click(within(optionsPopupEl).getByText('Grocery'));
    fireEvent(getTextArea(), pasteText('something'));
    userEvent.type(priceInput, '1337');
    userEvent.type(discountPriceInput, '1234');
    userEvent.click(editButton);

    expect(screen.getByTestId('load')).toBeInTheDocument();
  });

  it('redirects to /admin after successful server response about editing a product', async () => {
    const nameInput = await screen.findByLabelText('Name');
    const discountPriceInput = await screen.findByLabelText('Discount price');
    const priceInput = await screen.findByLabelText('Price');
    const editButton = screen.getByText('Edit');

    userEvent.type(nameInput, 'something');

    const selectLabel = /Category/i;
    const selectEl = await screen.findByLabelText(selectLabel);

    expect(selectEl).toBeInTheDocument();

    userEvent.click(selectEl);

    const optionsPopupEl = await screen.findByRole('listbox', {
      name: selectLabel,
    });

    userEvent.click(within(optionsPopupEl).getByText('Grocery'));
    fireEvent(getTextArea(), pasteText('something'));
    userEvent.type(priceInput, '1337');
    userEvent.type(discountPriceInput, '1234');
    userEvent.click(editButton);
    expect(screen.getByTestId('load')).toBeInTheDocument();
  });

  it('makes name input invalid since it requires latin', async () => {
    const nameInput = await screen.findByLabelText('Name');

    userEvent.type(nameInput, 'текст на русском');

    expect(nameInput.getAttribute('aria-invalid')).toBe('true');
  });

  it('makes edit button disabled if some inputs are invalid', async () => {
    const nameInput = await screen.findByLabelText('Name');
    const discountPriceInput = await screen.findByLabelText('Discount price');
    const priceInput = await screen.findByLabelText('Price');
    const editButton = screen.getByText('Edit');
    const imgUploader = await screen.findByLabelText(
      /choose images to upload/i
    );
    const file = new File(['(⌐□_□)'], 'image_1.png', { type: 'image/png' });

    userEvent.type(nameInput, 'something');

    const selectLabel = /Category/i;
    const selectEl = await screen.findByLabelText(selectLabel);

    expect(selectEl).toBeInTheDocument();

    userEvent.click(selectEl);

    const optionsPopupEl = await screen.findByRole('listbox', {
      name: selectLabel,
    });

    userEvent.click(within(optionsPopupEl).getByText('Grocery'));
    fireEvent(getTextArea(), pasteText('something'));
    userEvent.upload(imgUploader, [file]);
    userEvent.type(priceInput, 'string value');
    userEvent.type(priceInput, '123');
    userEvent.type(discountPriceInput, 'Non');
    expect(editButton).toBeDisabled();
    userEvent.type(priceInput, `\b\b\b\b\b\b string value`);
    userEvent.type(discountPriceInput, `{backspace}{backspace}{backspace}1`);
    expect(editButton).toBeDisabled();
  });
  it('makes edit button disabled if it is uploaded too many images', async () => {
    const file = new File(['(⌐□_□)'], 'image_1.png', { type: 'image/png' });
    const files = new Array(11).fill(file);
    const imgUploader = await screen.findByLabelText(
      /choose images to upload/i
    );
    const editButton = screen.getByText('Edit');

    userEvent.upload(imgUploader, files);
    expect(editButton).toBeDisabled();
  });
});
