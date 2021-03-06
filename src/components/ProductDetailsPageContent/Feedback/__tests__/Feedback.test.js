import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { ERROR } from '../../../../constants/constants';
import { DEFAULT_NAME } from '../../../../constants/feedbackConstants';
import feedbackDto from '../../../../test-utils/dto/feedbackDto';
import usersDto from '../../../../test-utils/dto/usersDto';
import { handleModal } from '../../../../test-utils/feedback/feedbackHandlers';
import render, { screen } from '../../../../test-utils/renderWith';
import { Role } from '../../../../ts/enums/enums';
import Feedback from '../Feedback';

const waitForFeedbacks = () => screen.findByTestId('comments');

const addFeedbackHandlers = [
  rest.get('/products', () => {}),
  rest.get('/feedbacks', (req, res, ctx) => {
    const productId = req.url.searchParams.get('productId');

    switch (productId.toString()) {
      case '2':
        return res(ctx.json(feedbackDto.slice(0, 2)));
      case '1':
        return res(ctx.json([feedbackDto[2]]));
    }
  }),
  rest.post('/feedbacks', (req, res, ctx) =>
    res(
      ctx.json({
        ...req.body,
        id: 3,
        productName: 'Tasty Fruit',
        createdAt: '2022-01-10T08:54:18.560Z',
      })
    )
  ),
  rest.patch('/rating', (req, res, ctx) =>
    res(
      ctx.json({
        ...req.body,
        id: req.body.productId,
      })
    )
  ),
];

const rejectPostFeedbackHandlers = [
  rest.get('/feedbacks', (req, res, ctx) => {
    const productId = req.url.searchParams.get('productId');

    switch (productId.toString()) {
      case '2':
        return res(ctx.json(feedbackDto.slice(0, 2)));
      case '1':
        return res(ctx.json([feedbackDto[2]]));
    }
  }),
  rest.post('/feedbacks', (req, res, ctx) => res(ctx.status(400))),
];

describe('access test', () => {
  const server = setupServer(
    rest.get('/feedbacks', (req, res, ctx) => res(ctx.json([])))
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  describe('access denied', () => {
    it('should not show button "add new feedback"', async () => {
      const { queryByRole } = render(<Feedback productId={0} />);

      await waitForFeedbacks();

      expect(queryByRole('button', { name: /add new feedback/i })).toBeNull();
    });
  });

  describe('access received', () => {
    const renderWithRole = async (role) => {
      render(<Feedback productId={0} />, {
        user: { user: { role } },
      });

      await waitForFeedbacks();

      return;
    };

    it('consumer should be able to add feedbacks', async () => {
      await renderWithRole(Role.Consumer);
      expect(
        screen.getByRole('button', { name: /add new feedback/i })
      ).toBeInTheDocument();
    });

    it('seller should be able to add feedbacks', async () => {
      await renderWithRole(Role.Seller);
      expect(
        screen.getByRole('button', { name: /add new feedback/i })
      ).toBeInTheDocument();
    });

    it('admin should be able to add feedbacks', async () => {
      await renderWithRole(Role.Admin);
      expect(
        screen.getByRole('button', { name: /add new feedback/i })
      ).toBeInTheDocument();
    });
  });
});

describe('functionality tests with admin role', () => {
  describe('failed feedback load', () => {
    const server = setupServer(
      rest.get('/feedbacks', (req, res, ctx) => res(ctx.status(400)))
    );

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    it('should show error notification', async () => {
      render(<Feedback productId={0} />, {
        user: usersDto[0],
      });

      expect(await screen.findByText(ERROR.LOAD_FEEDBACK)).toBeInTheDocument();
    });
  });

  describe('empty feedbacks section', () => {
    const server = setupServer(
      rest.get('/feedbacks', (req, res, ctx) => res(ctx.json([])))
    );

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    it('should render a valid snapshot', async () => {
      const { asFragment } = render(<Feedback productId={0} />, {
        user: usersDto[0],
      });

      await waitForFeedbacks();

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('full feedback section', () => {
    const server = setupServer(...addFeedbackHandlers);

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    it('should render product comments', async () => {
      const { asFragment } = render(<Feedback productId={1} />, {
        user: usersDto[0],
      });

      await waitForFeedbacks();

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('add new feedback', () => {
    const server = setupServer(...addFeedbackHandlers);

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    beforeEach(() =>
      render(<Feedback productId={2} />, { user: usersDto[3] }, '/products', [
        '/products',
      ])
    );

    it('should sort feedbacks in descending order by date', async () => {
      await waitForFeedbacks();

      handleModal({});

      await screen.findByText(DEFAULT_NAME, { exact: false });

      expect(await screen.findByTestId('feedback-section')).toMatchSnapshot();
    }, 20000);

    it('should display a new feedback with correct name', async () => {
      const name = 'test';

      await waitForFeedbacks();

      handleModal({ name });

      expect(
        await screen.findByText(name, { exact: false })
      ).toBeInTheDocument();
    }, 20000);

    it('should display a notification after posting a feedback', async () => {
      await waitForFeedbacks();

      handleModal({});

      await screen.findByText(DEFAULT_NAME, { exact: false });

      expect(
        await screen.findByText('Your feedback has been added')
      ).toBeInTheDocument();
    }, 20000);

    it('should display a new feedback with "Anonymous"', async () => {
      await waitForFeedbacks();

      handleModal({});

      expect(
        await screen.findByText(DEFAULT_NAME, { exact: false })
      ).toBeInTheDocument();
    }, 20000);
  });

  describe('error after add', () => {
    const server = setupServer(...rejectPostFeedbackHandlers);

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    beforeEach(() => render(<Feedback productId={2} />, { user: usersDto[0] }));

    it('should display error notification with failed posting', async () => {
      await waitForFeedbacks();

      handleModal({});

      expect(
        await screen.findByText(`Feedback haven't been added`)
      ).toBeInTheDocument();
    }, 20000);
  });
});
