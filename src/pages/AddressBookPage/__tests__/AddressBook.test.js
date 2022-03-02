import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { notificationError } from '../../../constants/constants';
import getAddressBookElements from '../../../test-utils/addressBook/getAddressBookElements';
import { addresses, newAddress } from '../../../test-utils/dto/addressesDto';
import { citiesRU, citiesBY } from '../../../test-utils/dto/citiesDto';
import { countries } from '../../../test-utils/dto/countriesDto';
import users from '../../../test-utils/dto/usersDto';
import render, { screen } from '../../../test-utils/renderWith';
import AddressBook from '../AddressBook';

const waitForAddressBook = () => screen.findAllByText(/address book/i);
const preloadedState = {
  user: users[0],
};

const server = setupServer(
  rest.get('/countries', (req, res, ctx) => res(ctx.json(countries))),
  rest.get('/cities/RU', (req, res, ctx) => res(ctx.json(citiesRU))),
  rest.get('/cities/BY', (req, res, ctx) => res(ctx.json(citiesBY))),
  rest.get('/addresses', (req, res, ctx) => {
    const addressIds = req.url.searchParams.getAll('id');
    const filteredAddresses = addressIds.map((id) => addresses[id - 1]);

    return res(ctx.json(filteredAddresses));
  }),
  rest.post('/addresses', (req, res, ctx) => {
    if (_.isEqual(newAddress, req.body)) {
      return res(ctx.json({ ...req.body, id: 4 }));
    }

    return res(ctx.status(400));
  }),
  rest.put('/addresses/1', (req, res, ctx) => {
    return res(ctx.json(req.body));
  }),
  rest.put('/addresses/3', (req, res, ctx) => {
    return res(ctx.status(400));
  }),
  rest.patch('/users/0', (req, res, ctx) => {
    return res(ctx.json(req.body));
  })
);

describe('AddressBook component', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  describe('Snapshot', () => {
    it('should render valid snapshot of AddressBook with data', async () => {
      const { asFragment } = render(<AddressBook />, preloadedState);

      await waitForAddressBook();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Main group of tests', () => {
    beforeEach(() => {
      render(<AddressBook />, { user: users[0] });
    });

    it('should add new address correctly', async () => {
      await waitForAddressBook();
      userEvent.click(screen.getByRole('button', { name: /add address/i }));

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

      userEvent.click(screen.getByText('add'));

      expect(
        await screen.findByText(/Address was successfully added/i)
      ).toBeInTheDocument();

      await waitFor(
        async () => {
          expect(await screen.findByText(/Nevskiy/i)).toBeInTheDocument();
        },
        {
          timeout: 10000,
        }
      );
    });

    it('Should get an error after trying to add an address', async () => {
      await waitForAddressBook();
      userEvent.click(screen.getByRole('button', { name: /add address/i }));

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

      userEvent.click(titleSelect);
      userEvent.click(await screen.findByRole('option', { name: 'Mr.' }));

      userEvent.type(nameInput, 'test');
      userEvent.type(surnameInput, 'test');
      userEvent.type(phoneInput, '11111111111');

      userEvent.type(countryInput, 'Russian F');
      await screen.findByRole('option', { name: /Russian Federation/i });
      userEvent.type(autocompleteCountry, '{arrowdown}');
      userEvent.type(autocompleteCountry, '{enter}');

      userEvent.type(cityInput, 'Saint P');
      await screen.findByRole('option', { name: /Saint Petersburg/i });
      userEvent.type(autocompleteCity, '{arrowdown}');
      userEvent.type(autocompleteCity, '{enter}');

      userEvent.type(streetInput, 'test');
      userEvent.type(buildingInput, 'test');
      userEvent.type(flatInput, 'test');
      userEvent.type(zipInput, '123456');

      userEvent.click(screen.getByText('add'));

      expect(await screen.findByText(notificationError)).toBeInTheDocument();
      expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
    });

    it('should edit new address correctly', async () => {
      await waitForAddressBook();

      userEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]);

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

      userEvent.click(titleSelect);
      userEvent.click(await screen.findByRole('option', { name: 'Mrs.' }));

      userEvent.clear(nameInput);
      userEvent.type(nameInput, 'Alexandra');
      userEvent.clear(surnameInput);
      userEvent.type(surnameInput, 'Sidorova');
      userEvent.clear(phoneInput);
      userEvent.type(phoneInput, '37525002020');

      userEvent.clear(countryInput);
      userEvent.type(countryInput, 'Bela');
      await screen.findByRole('option', { name: /Belarus/i });
      userEvent.type(autocompleteCountry, '{arrowdown}');
      userEvent.type(autocompleteCountry, '{enter}');

      userEvent.type(cityInput, 'Min');
      await screen.findByRole('option', { name: /Minsk/i });
      userEvent.type(autocompleteCity, '{arrowdown}');
      userEvent.type(autocompleteCity, '{enter}');

      userEvent.clear(streetInput);
      userEvent.type(streetInput, 'Avangardnaya');
      userEvent.clear(buildingInput);
      userEvent.type(buildingInput, '12');
      userEvent.clear(flatInput);
      userEvent.type(flatInput, '21');
      userEvent.clear(zipInput);
      userEvent.type(zipInput, '220004');

      userEvent.click(screen.getByText('save'));

      expect(
        await screen.findByText(/Address was successfully edited/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/Avangardnaya/i)).toBeInTheDocument();
    });

    it('Should get an error after trying to edit an address', async () => {
      await waitForAddressBook();

      userEvent.click(screen.getAllByRole('button', { name: /edit/i })[1]);
      userEvent.click(screen.getByText('save'));

      expect(await screen.findByText(notificationError)).toBeInTheDocument();
    });
  });
});
