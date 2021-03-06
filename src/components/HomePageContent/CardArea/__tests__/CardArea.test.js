import { render } from '@testing-library/react';
import React from 'react';

import { CardArea } from '../CardArea';

describe('CardArea component', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <CardArea>
          <div>Div test</div>
          <p>Text test</p>
          Random test
        </CardArea>
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
