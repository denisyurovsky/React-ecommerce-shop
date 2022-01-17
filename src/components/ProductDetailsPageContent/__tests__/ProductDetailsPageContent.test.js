import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { USER_ROLE } from '../../../helpers/constants/constants';
import { DEFAULT_NAME } from '../../../helpers/constants/feedbackConstants';
import feedbackDto from '../../../test-utils/dto/feedbackDto';
import productsDto from '../../../test-utils/dto/productsDto';
import { handleModal } from '../../../test-utils/feedback/feedbackHandlers';
import renderWithStore, { screen } from '../../../test-utils/renderWithStore';
import ProductDetailsPageContent from '../ProductDetailsPageContent';

const handlersFulfilled = [
  rest.get('/products/1', (req, res, ctx) => res(ctx.json(productsDto[0]))),
  rest.get('/feedbacks', (req, res, ctx) => res(ctx.json([]))),
];

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

describe('ProductDetailsPageContent', () => {
  describe('snapshots', () => {
    const server = setupServer(...handlersFulfilled);

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    it('renders a valid snapshot', async () => {
      const { asFragment, findByTestId } = renderWithStore(
        <ProductDetailsPageContent product={productsDto[0]} />,
        { role: USER_ROLE.ADMIN }
      );

      await findByTestId('comments');
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

describe('Product rating', () => {
  const server = setupServer(...addFeedbackHandlers);

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should show total rating', async () => {
    const { getByTestId } = renderWithStore(
      <ProductDetailsPageContent product={productsDto[2]} />,
      { role: USER_ROLE.ADMIN }
    );

    await screen.findByTestId('comments');

    expect(
      getByTestId('total-rating').querySelectorAll('[data-testid="StarIcon"]')
    ).toHaveLength(8);
  });

  it('should change total rating', async () => {
    renderWithStore(<ProductDetailsPageContent product={productsDto[2]} />, {
      role: USER_ROLE.ADMIN,
    });

    await screen.findByTestId('comments');
    handleModal({ rating: 2 });

    await screen.findByText(DEFAULT_NAME, { exact: false });
    await screen.findAllByTestId('StarBorderIcon');

    expect(
      screen
        .getByTestId('total-rating')
        .querySelectorAll('[data-testid="StarIcon"]')
    ).toHaveLength(7);
  });
});
