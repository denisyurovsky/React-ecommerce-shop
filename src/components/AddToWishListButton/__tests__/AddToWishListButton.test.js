import React from 'react';

import usersDto from '../../../test-utils/dto/usersDto';
import render from '../../../test-utils/renderWith';
import AddToWishListButton from '../AddToWishListButton';

describe('AddToWishListButton component', () => {
  it('guest should not see the component', () => {
    const { asFragment } = render(<AddToWishListButton productId={1} />, {
      user: usersDto[0],
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
