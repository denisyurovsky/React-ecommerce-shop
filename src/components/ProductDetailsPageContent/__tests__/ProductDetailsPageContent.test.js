import { render } from '@testing-library/react';
import React from 'react';

import productsDto from '../../../test-utils/dto/productsDto';
import ProductDetailsPageContent from '../ProductDetailsPageContent';

describe('ProductDetailsPageContent', () => {
  describe('snapshots', () => {
    it('renders a valid snapshot', () => {
      const { asFragment } = render(
        <ProductDetailsPageContent product={productsDto[0]} />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
