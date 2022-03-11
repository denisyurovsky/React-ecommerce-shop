import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import feedbackDto from '../../../../test-utils/dto/feedbackDto';
import render, { screen } from '../../../../test-utils/renderWith';
import ProfileConsumer from '../ProfileConsumer';

const waitForFeedbacks = () => screen.findByTestId('comments');

const server = setupServer(
  rest.get('/users/:id/feedbacks', (req, res, ctx) => {
    switch (req.params.id) {
      case '0':
        return res(ctx.json([]));
      case '1':
        return res(ctx.status(400));
      case '3':
        return res(ctx.json([feedbackDto[1]]));
      case '4':
        return res(ctx.json([feedbackDto[2]]));
      default:
        return;
    }
  })
);

const setProps = (id) => ({ profileId: id, productName: 'Headphones' });

describe('ProfileConsumer component', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should render user comments', async () => {
    const { asFragment } = render(<ProfileConsumer {...setProps(3)} />);

    await waitForFeedbacks();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render "Anonymous" user comments', async () => {
    const { asFragment } = render(<ProfileConsumer {...setProps(4)} />);

    await waitForFeedbacks();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show correct message', async () => {
    render(<ProfileConsumer {...setProps(0)} />);
    await waitForFeedbacks();

    expect(
      screen.getByText('There are no comments from this user.')
    ).toBeInTheDocument();
  });

  it('should show error notification', async () => {
    render(<ProfileConsumer {...setProps(1)} />);

    expect(
      await screen.findByText('Failed to load feedbacks.')
    ).toBeInTheDocument();
  });
});
