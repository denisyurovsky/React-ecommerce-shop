import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import users from '../../../test-utils/dto/usersDto';
import render, { screen } from '../../../test-utils/renderWith';
import ProfilePage from '../ProfilePage';

const waitForProfile = () => screen.findByTestId('profile');
const waitForProducts = () => screen.findByText('There are no products');
const waitForFeedbacks = () => screen.findByTestId('comments');
const preloadedState = { user: users[1] };

const server = setupServer(
  rest.get('/users/2', (req, res, ctx) => res(ctx.json(users[2].user))),
  rest.get('/users/3', (req, res, ctx) => res(ctx.json(users[3].user))),
  rest.get('/users/10', (req, res, ctx) => res(ctx.status(404))),
  rest.get('/products', (req, res, ctx) => res(ctx.json({}))),
  rest.get('/users/3/feedbacks', (req, res, ctx) => res(ctx.json({}))),
  rest.get('/users/undefined', (req, res, ctx) => res(ctx.json({})))
);

describe('ProfilePage component', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should show "Loader"', async () => {
    const isLoadingState = { user: { id: 1 }, isLoading: true };
    const { asFragment } = render(<ProfilePage />, { user: isLoadingState });

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render seller page', async () => {
    const { asFragment } = render(
      <ProfilePage />,
      preloadedState,
      '/users/:id',
      ['/users/2']
    );

    await waitForProfile();
    expect(await screen.findByText('Elon Musk')).toBeInTheDocument();
    await waitForProducts();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render consumer page', async () => {
    const { asFragment } = render(
      <ProfilePage />,
      preloadedState,
      '/users/:id',
      ['/users/3']
    );

    await waitForProfile();
    expect(await screen.findByText('Joe Doe')).toBeInTheDocument();
    await waitForFeedbacks();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render "Page Not Found"', async () => {
    render(<ProfilePage />, preloadedState, '/users/:id', ['/users/10']);

    expect(await screen.findByText(/oooops!/i)).toBeInTheDocument();
  });
});
