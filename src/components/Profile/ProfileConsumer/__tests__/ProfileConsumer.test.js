import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import feedbackDto from '../../../../test-utils/dto/feedbackDto';
import render, { screen } from '../../../../test-utils/renderWith';
import ProfileConsumer from '../ProfileConsumer';

const waitForFeedbacks = () => screen.findByTestId('comments');

const server = setupServer(
  rest.get('/users/0/feedbacks', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get('/users/1/feedbacks', (req, res, ctx) => {
    return res(ctx.status(400));
  }),
  rest.get('/users/3/feedbacks', (req, res, ctx) => {
    return res(ctx.json([feedbackDto[2]]));
  })
);

describe('ProfileConsumer component', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should render user comments', async () => {
    const { asFragment } = render(<ProfileConsumer profileId={3} />);

    await waitForFeedbacks();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show correct message', async () => {
    render(<ProfileConsumer profileId={0} />);
    await waitForFeedbacks();

    expect(
      screen.getByText('There are no comments from this user.')
    ).toBeInTheDocument();
  });

  it('should show error notification', async () => {
    render(<ProfileConsumer profileId={1} />);

    expect(
      await screen.findByText('Failed to load feedbacks.')
    ).toBeInTheDocument();
  });
});
