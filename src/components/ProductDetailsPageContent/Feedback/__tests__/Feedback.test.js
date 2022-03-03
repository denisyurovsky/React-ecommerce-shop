import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { ERROR, USER_ROLE } from '../../../../constants/constants';
import { DEFAULT_NAME } from '../../../../constants/feedbackConstants';
import feedbackDto from '../../../../test-utils/dto/feedbackDto';
import { handleModal } from '../../../../test-utils/feedback/feedbackHandlers';
import renderWithStore, {
  screen,
} from '../../../../test-utils/renderWithStore';
import Feedback from '../Feedback';

const waitForFeedbacks = () => screen.findByTestId('comments');

const addFeedbackHandlers = [
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
        createdAt: '2022-01-02T08:54:18.560Z',
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
      const { queryByRole } = renderWithStore(<Feedback productId={0} />, {
        role: USER_ROLE.GUEST,
      });

      await waitForFeedbacks();

      expect(queryByRole('button', { name: /add new feedback/i })).toBeNull();
    });
  });

  describe('access received', () => {
    const renderWithRole = async (role) => {
      renderWithStore(<Feedback productId={0} />, { role });

      await waitForFeedbacks();

      return;
    };

    it('consumer should be able to add feedbacks', async () => {
      await renderWithRole(USER_ROLE.CONSUMER);
      expect(
        screen.getByRole('button', { name: /add new feedback/i })
      ).toBeInTheDocument();
    });

    it('seller should be able to add feedbacks', async () => {
      await renderWithRole(USER_ROLE.SELLER);
      expect(
        screen.getByRole('button', { name: /add new feedback/i })
      ).toBeInTheDocument();
    });

    it('admin should be able to add feedbacks', async () => {
      await renderWithRole(USER_ROLE.ADMIN);
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
      renderWithStore(<Feedback productId={0} />, { role: USER_ROLE.ADMIN });

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
      const { asFragment } = renderWithStore(<Feedback productId={0} />, {
        role: USER_ROLE.ADMIN,
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
      const { asFragment } = renderWithStore(<Feedback productId={1} />, {
        role: USER_ROLE.ADMIN,
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
      renderWithStore(<Feedback productId={2} />, { role: USER_ROLE.ADMIN })
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

    beforeEach(() =>
      renderWithStore(<Feedback productId={2} />, { role: USER_ROLE.ADMIN })
    );

    it('should display error notification with failed posting', async () => {
      await waitForFeedbacks();

      handleModal({});

      expect(
        await screen.findByText(`Feedback haven't been added`)
      ).toBeInTheDocument();
    }, 20000);
  });
});
