import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';

import { App } from '../App';

describe('App component', () => {
  it('full app rendering/navigating', () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  it('landing on a "NotFoundPage"', () => {
    const history = createMemoryHistory();

    history.push('/some/bad/route');
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );

    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
