import { render } from '@testing-library/react';
import React from 'react';

import { StandardTextField } from '../StandardTextField';

describe('StandardTextField component', () => {
  describe('snapshots', () => {
    it('renders a snapshot with all values', () => {
      const { asFragment } = render(
        <StandardTextField
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
