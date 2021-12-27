import { createMemoryHistory } from 'history';
import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';

import renderWithStore, { screen } from '../../../test-utils/renderWithStore';
import { App } from '../App';

describe('App component', () => {
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
});
