import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { addresses } from '../../../../test-utils/dto/addressesDto';
import { citiesRU, citiesBY } from '../../../../test-utils/dto/citiesDto';
import { countries } from '../../../../test-utils/dto/countriesDto';
import renderWith, { screen } from '../../../../test-utils/renderWith';
import DeliveryAddress from '../DeliveryAddress';

const preloaderState = {
  countries: {
    data: [],
    isLoading: false,
    errorOccurred: false,
    errorMessage: '',
  },
};

const server = setupServer(
  rest.get('/countries', (req, res, ctx) =>
    res(ctx.json(countries), ctx.status(200))
  ),
  rest.get('/cities/RU', (req, res, ctx) => res(ctx.json(citiesRU))),
  rest.get('/cities/BY', (req, res, ctx) => res(ctx.json(citiesBY)))
);

describe('DeliveryAddress component', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should render valid snapshot', async () => {
    const { asFragment } = renderWith(
      <DeliveryAddress
        handleChange={() => {}}
        address={addresses[0]}
        setAddress={() => {}}
      />,
      preloaderState
    );

    const autocompleteCountry = screen.getByTestId('autocomplete-country');
    const countryInput = autocompleteCountry.querySelector('input');

    userEvent.type(countryInput, 'Bela');
    await screen.findByRole('option', { name: /Belarus/i });
    userEvent.type(autocompleteCountry, '{arrowdown}');
    userEvent.type(autocompleteCountry, '{enter}');

    expect(asFragment()).toMatchSnapshot();
  });
});
