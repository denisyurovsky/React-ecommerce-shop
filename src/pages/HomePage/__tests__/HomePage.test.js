import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../../../store/store';
import { HomePage } from '../HomePage';

describe('HomePage component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <HomePage />
        </Provider>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
