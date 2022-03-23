import { Button } from '@mui/material';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React, { useState } from 'react';

import usersDto from '../../../../test-utils/dto/usersDto';
import renderWith, { screen } from '../../../../test-utils/renderWith';
import { AddToWishlistModal } from '../AddToWishlistModal';

const handlersFulfilled = rest.patch('/users/3', (req, res, ctx) =>
  res(ctx.json(req.body))
);
const handlersRejected = rest.patch('/users/3', (req, res, ctx) =>
  res(ctx.status(404))
);

const Wrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <>
      <AddToWishlistModal
        isModalOpen={isOpen}
        productId={1}
        closeWishlistModal={handleOpen}
      />
      <Button onClick={handleOpen}>Modal</Button>
    </>
  );
};

const store = { user: usersDto[3] };
const modalBtn = ['button', { name: /modal/i }];
const createBtn = ['button', { name: /create/i }];

describe('AddToWishlistModal component', () => {
  it('show form for adding new wishlist', () => {
    const { asFragment } = renderWith(<Wrapper />, store);

    userEvent.click(screen.getByRole(...modalBtn));
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    const addButton = screen.getByTestId('addButton');

    userEvent.click(addButton);
    expect(screen.getByTestId('formAddNewWishlist')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('check that name is unique', () => {
    renderWith(<Wrapper />, store);

    userEvent.click(screen.getByRole(...modalBtn));
    userEvent.click(screen.getByTestId('addButton'));
    const createButton = screen.getByRole(...createBtn);

    expect(createButton).toBeDisabled();
    userEvent.type(screen.getByLabelText('Name'), 'Gifts for the wife2');
    expect(createButton).not.toBeDisabled();
    userEvent.type(screen.getByLabelText('Name'), '{backspace}');
    expect(createButton).toBeDisabled();
  });
});

describe.each([
  [
    'should create wishlist',
    handlersFulfilled,
    Wrapper,
    store,
    'was successfully added',
  ],
  [
    'should check server error respond',
    handlersRejected,
    Wrapper,
    store,
    'was not added',
  ],
])(
  'AddToWishlistModal component',
  (title, handler, Wrapper, store, expectedText) => {
    it(`${title}`, async () => {
      const server = setupServer(handler);

      server.listen();
      renderWith(<Wrapper />, store);
      userEvent.click(screen.getByRole(...modalBtn));
      userEvent.click(screen.getByTestId('addButton'));
      const createButton = screen.getByRole(...createBtn);

      userEvent.type(screen.getByLabelText('Name'), 'My Wishlist');
      userEvent.click(createButton);
      const notification = await screen.findByRole('alert');

      expect(notification).toHaveTextContent(expectedText);
      server.close();
    });
  }
);
