import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { KEYS } from '../../../constants/constants';
import getAddressBookElements from '../../../test-utils/addressBook/getAddressBookElements';
import { addressesDto } from '../../../test-utils/dto/addressesDto';
import { checkoutCart } from '../../../test-utils/dto/cartDto';
import { citiesRU } from '../../../test-utils/dto/citiesDto';
import { countries } from '../../../test-utils/dto/countriesDto';
import {
  checkoutGuestEditAddressOrderResponse,
  checkoutGuestOrderRequest,
  checkoutGuestOrderResponse,
  checkoutUserEditAddressOrderResponse,
  checkoutUserOrderRequest,
  checkoutUserOrderResponse,
  orderResponseId12,
  orderResponseId17,
  orderResponseId20,
} from '../../../test-utils/dto/ordersDto';
import { CheckoutPageProducts } from '../../../test-utils/dto/productsDto';
import users from '../../../test-utils/dto/usersDto';
import render, { screen, waitFor } from '../../../test-utils/renderWith';
import CheckoutPage, { CheckoutContext } from '../CheckoutPage';

const CheckoutWrapper = () => (
  <CheckoutContext.Provider value={''}>
    <CheckoutPage />
  </CheckoutContext.Provider>
);

const preloadedStateWithoutAddresses = {
  user: users[2],
  cart: checkoutCart,
};

const preloadedStateWithAddresses = {
  user: users[0],
  cart: checkoutCart,
  addresses: { data: addressesDto },
};

const server = setupServer(
  rest.get('/countries', (req, res, ctx) => res(ctx.json(countries))),
  rest.get('/cities/RU', (req, res, ctx) => res(ctx.json(citiesRU))),
  rest.get('/products', (req, res, ctx) => res(ctx.json(CheckoutPageProducts))),
  rest.get('/addresses', (req, res, ctx) => res(ctx.json(addressesDto))),
  rest.get('/addresses/0', (req, res, ctx) => res(ctx.json(addressesDto[0]))),
  rest.get('/addresses/2', (req, res, ctx) => res(ctx.json(addressesDto[1]))),
  rest.get('/orders', (req, res, ctx) => {
    const reqId = Number(req.url.searchParams.get('id'));

    if (reqId === 17) {
      return res(ctx.json(orderResponseId17));
    }
    if (reqId === 12) {
      return res(ctx.json(orderResponseId12));
    }
    if (reqId === 20) {
      return res(ctx.json(orderResponseId20));
    }

    return res(ctx.status(400));
  }),
  rest.post('/orders', (req, res, ctx) => {
    if (_.isEqual(checkoutUserOrderRequest, req.body)) {
      return res(ctx.json(checkoutUserOrderResponse));
    }
    if (_.isEqual(checkoutGuestOrderRequest, req.body)) {
      return res(ctx.json(checkoutGuestOrderResponse));
    }

    return res(ctx.status(400));
  }),
  rest.patch('/orders/10', (req, res, ctx) => {
    return res(ctx.json(checkoutUserEditAddressOrderResponse));
  }),
  rest.patch('/orders/12', (req, res, ctx) => {
    return res(ctx.json(checkoutGuestEditAddressOrderResponse));
  }),
  rest.put('/cart/2', (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.put('/cart/0', (req, res, ctx) => {
    return res(ctx.json(req.body));
  })
);

describe('CheckoutPage component', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('order address should be edited by user without address', async () => {
    render(
      <CheckoutWrapper />,
      preloadedStateWithoutAddresses,
      '/checkout/:id',
      ['/checkout/12']
    );
    await screen.findAllByText(/Checkout/i);
    const { titleSelect, nameInput, surnameInput, streetInput, buildingInput } =
      getAddressBookElements(screen);

    userEvent.click(screen.getByTestId('personalInformationSummery'));
    userEvent.click(titleSelect);
    userEvent.click(screen.getByRole('option', { name: 'Mrs.' }));
    nameInput.select();
    userEvent.type(nameInput, 'Jennifer');
    surnameInput.select();
    userEvent.type(surnameInput, 'Aniston');
    userEvent.click(screen.getByTestId('personalInformationButton'));
    streetInput.select();
    userEvent.type(streetInput, 'Ligovskiy');
    buildingInput.select();
    userEvent.type(buildingInput, '11');
    userEvent.click(screen.getByTestId('personalAddressButton'));
    const fullName = screen.getByTestId('fullName');

    expect(fullName).toHaveTextContent(/Mrs. Jennifer Aniston/i);
    const address = screen.getByTestId('address');

    expect(address).toHaveTextContent(/Ligovskiy, 11/i);
  });

  it('order should be added by user without address', async () => {
    render(<CheckoutWrapper />, preloadedStateWithoutAddresses);
    await screen.findAllByText(/Checkout/i);
    const {
      titleSelect,
      phoneInput,
      autocompleteCountry,
      countryInput,
      autocompleteCity,
      cityInput,
      streetInput,
      buildingInput,
      flatInput,
      zipInput,
    } = getAddressBookElements(screen);

    userEvent.click(titleSelect);
    userEvent.click(screen.getByRole('option', { name: 'Mr.' }));
    userEvent.type(phoneInput, '79811112233');
    userEvent.click(screen.getByRole('button', { name: /proceed/i }));
    userEvent.type(countryInput, 'Russian F');
    await screen.findByRole('option', { name: /Russian Federation/i });
    userEvent.type(autocompleteCountry, `{${KEYS.ARROWDOWN}}`);
    userEvent.type(autocompleteCountry, `{${KEYS.ENTER}}`);
    userEvent.type(cityInput, 'Saint P');
    await screen.findByRole('option', { name: /Saint Petersburg/i });
    userEvent.type(autocompleteCity, `{${KEYS.ARROWDOWN}}`);
    userEvent.type(autocompleteCity, `{${KEYS.ENTER}}`);
    userEvent.type(streetInput, 'Nevskiy');
    userEvent.type(buildingInput, '8');
    userEvent.type(flatInput, '33');
    userEvent.type(zipInput, '168142');
    userEvent.click(screen.getByRole('button', { name: /proceed/i }));
    expect(screen.getByTestId('PaymentMethodAccordion')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    const fullName = screen.getByTestId('fullName');

    expect(fullName).toHaveTextContent(/Mr. Elon Musk/i);
    const address = screen.getByTestId('address');

    expect(address).toHaveTextContent(/Nevskiy, 8/i);
    await waitFor(() => expect(window.location.pathname).toBe('/checkout/17'));
  });

  it('order should be added by user with address', async () => {
    render(<CheckoutWrapper />, preloadedStateWithAddresses);
    await screen.findAllByText(/Checkout/i);
    const radioGroup = screen.getByRole('radiogroup');

    userEvent.click(radioGroup.querySelectorAll('label')[0]);
    userEvent.click(screen.getByRole('button', { name: /proceed/i }));
    expect(screen.getByTestId('PaymentMethodAccordion')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
    const fullName = screen.getByTestId('fullName');

    expect(fullName).toHaveTextContent(/Mr. Alexander Sidorov/i);
    await waitFor(() => expect(window.location.pathname).toBe('/checkout/20'));
  });

  it('order address should be edited by user with address', async () => {
    render(<CheckoutWrapper />, preloadedStateWithAddresses, '/checkout/:id', [
      '/checkout/20',
    ]);

    await screen.findAllByText(/Checkout/i);
    const deliveryAddressSummery = screen.getByTestId('deliveryAddressSummery');

    userEvent.click(deliveryAddressSummery);
    const radioGroup = screen.getByRole('radiogroup');

    userEvent.click(radioGroup.querySelectorAll('label')[1]);
    userEvent.click(screen.getByRole('button', { name: /proceed/i }));
    const fullName = screen.getByTestId('fullName');

    expect(fullName).toHaveTextContent(/Mrs. Alexandra Sidorova/i);
  });
});
