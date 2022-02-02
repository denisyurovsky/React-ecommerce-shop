import { createMemoryHistory } from 'history';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';

import categoriesDto from '../../../test-utils/dto/categoriesDto';
import productsDto from '../../../test-utils/dto/productsDto';
import { userDto } from '../../../test-utils/dto/userDto';
import renderWithStore, { screen } from '../../../test-utils/renderWithStore';
import { App } from '../App';

const handlersFulfilled = [
  rest.get('/categories', (req, res, ctx) => {
    return res(ctx.json(categoriesDto));
  }),
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.json(productsDto));
  }),
  rest.get('/users/1', (req, res, ctx) => {
    return res(ctx.json(userDto));
  }),
];

describe('App component', () => {
  const server = setupServer(...handlersFulfilled);

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  it('full app rendering/navigating', () => {
    renderWithStore(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/EPAM systems/i)).toBeInTheDocument();
  });
  it('landing on a "NotFoundPage"', () => {
    const history = createMemoryHistory();

    history.push('/some/bad/route');
    renderWithStore(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });

  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJvcm4yZGllLmNvbSIsImlhdCI6MTY0MzcxOTM2NiwiZXhwIjoxNjQzNzIyOTY2LCJzdWIiOiIxIn0.AsOF1x9vVcLklRmsnmUmDdn-KoajVJD2X1xVWgYVKlc';

  describe('should check access token', () => {
    it('should be button "Log in"', () => {
      localStorage.clear();
      renderWithStore(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByTestId('btn-login')).toBeInTheDocument();
    });
    it('should be button "Profile"', async () => {
      localStorage.setItem('accessToken', accessToken);
      renderWithStore(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(await screen.findByTestId('btn-profile')).toBeInTheDocument();
    });
  });
});
