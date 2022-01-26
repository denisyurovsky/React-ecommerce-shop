import React from 'react';

import renderWithStore from '../../../test-utils/renderWithStore';
import AddToWishListButton from '../AddToWishListButton';

describe('AddToWishListButton component', () => {
  it('guest should not see the component', () => {
    const { asFragment } = renderWithStore(
      <AddToWishListButton productId={1} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
