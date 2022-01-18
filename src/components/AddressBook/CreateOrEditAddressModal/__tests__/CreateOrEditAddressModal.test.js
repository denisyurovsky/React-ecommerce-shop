import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import CreateOrEditAddressModalWrapper from '../../../../test-utils/addressBook/CreateOrEditAddressModalWrapper';
import getAddressBookElements from '../../../../test-utils/addressBook/getAddressBookElements';
import { citiesRU, citiesBY } from '../../../../test-utils/dto/citiesDto';
import { countries } from '../../../../test-utils/dto/countriesDto';
import render, { screen } from '../../../../test-utils/renderWith';

const server = setupServer(
  rest.get('/countries', (req, res, ctx) => res(ctx.json(countries))),
  rest.get('/cities/RU', (req, res, ctx) => res(ctx.json(citiesRU))),
  rest.get('/cities/BY', (req, res, ctx) => res(ctx.json(citiesBY)))
);

describe('AddressBook component', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  describe('CreateOrEditAddressModal', () => {
    beforeEach(() => {
      render(<CreateOrEditAddressModalWrapper />);
      userEvent.click(screen.getByRole('button'));
    });

    it('add button should be disabled with empty fields', async () => {
      const addButton = screen.getByText('add');

      expect(addButton).toBeDisabled();
    });

    it('add button should be disabled with some empty fields', async () => {
      const { nameInput, phoneInput, flatInput, zipInput } =
        getAddressBookElements(screen);
      const addButton = screen.getByText('add');

      userEvent.type(nameInput, 'Jon');
      userEvent.type(phoneInput, '79811112233');
      userEvent.type(flatInput, '33');
      userEvent.type(zipInput, '168142');

      expect(addButton).toBeDisabled();
    });

    it('fields helpers should work correctly', async () => {
      const {
        titleSelect,
        nameInput,
        surnameInput,
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

      titleSelect.focus();
      nameInput.focus();
      surnameInput.focus();
      phoneInput.focus();
      countryInput.focus();
      streetInput.focus();
      buildingInput.focus();
      zipInput.focus();
      flatInput.focus();

      expect(
        screen.getAllByText('This field should not be empty')
      ).toHaveLength(5);
      expect(screen.getByText('The zip is invalid')).toBeInTheDocument();
      expect(
        screen.getByText('The phone number is invalid')
      ).toBeInTheDocument();

      userEvent.click(titleSelect);
      userEvent.click(await screen.findByRole('option', { name: 'Mr.' }));

      userEvent.type(nameInput, 'Jon');
      userEvent.type(surnameInput, 'Smith');
      userEvent.type(phoneInput, '79811112233');

      userEvent.type(countryInput, 'Russian F');
      await screen.findByRole('option', { name: /Russian Federation/i });
      userEvent.type(autocompleteCountry, '{arrowdown}');
      userEvent.type(autocompleteCountry, '{enter}');

      userEvent.type(cityInput, 'Saint P');
      await screen.findByRole('option', { name: /Saint Petersburg/i });
      userEvent.type(autocompleteCity, '{arrowdown}');
      userEvent.type(autocompleteCity, '{enter}');

      userEvent.type(streetInput, 'Nevskiy');
      userEvent.type(buildingInput, '8');
      userEvent.type(flatInput, '33');
      userEvent.type(zipInput, '168142');

      expect(
        screen.queryByText('This field should not be empty')
      ).not.toBeInTheDocument();
      expect(screen.queryByText('The zip is invalid')).not.toBeInTheDocument();
      expect(
        screen.queryByText('The phone number is invalid')
      ).not.toBeInTheDocument();
    });

    it('country and city fields should work correctly', async () => {
      const { autocompleteCountry, countryInput, cityInput } =
        getAddressBookElements(screen);

      expect(cityInput).toBeDisabled();

      userEvent.type(countryInput, 'Russian F');
      await screen.findByRole('option', { name: /Russian Federation/i });
      userEvent.type(autocompleteCountry, '{arrowdown}');
      userEvent.type(autocompleteCountry, '{enter}');

      expect(countryInput).not.toBeDisabled();

      cityInput.focus();
      countryInput.focus();

      expect(
        screen.getByText('This field should not be empty')
      ).toBeInTheDocument();
    });

    it('zip field should be validated correctly with country Russia', async () => {
      const { autocompleteCountry, countryInput, flatInput, zipInput } =
        getAddressBookElements(screen);

      userEvent.type(countryInput, 'Russian F');
      await screen.findByRole('option', { name: /Russian Federation/i });
      userEvent.type(autocompleteCountry, '{arrowdown}');
      userEvent.type(autocompleteCountry, '{enter}');

      userEvent.type(zipInput, '168');
      flatInput.focus();
      expect(screen.getByText('The zip is invalid')).toBeInTheDocument();

      userEvent.type(zipInput, '168142');
      flatInput.focus();

      expect(screen.queryByText('The zip is invalid')).not.toBeInTheDocument();
    });
  });
});
