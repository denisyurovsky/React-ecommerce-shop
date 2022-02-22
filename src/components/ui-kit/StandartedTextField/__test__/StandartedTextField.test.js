import { render } from '@testing-library/react';
import React from 'react';

import { StandartedTextField } from '../StandartedTextField';

describe('StandartedTextField component', () => {
  describe('snapshots', () => {
    it('renders a snapshot with all values', () => {
      const { asFragment } = render(
        <StandartedTextField
          value="Value for tests"
          onChange={() => {}}
          labelText="Label for tests"
          error={false}
          helperText="Helper text fo tests"
          disabled={false}
          autoComplete="off"
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
