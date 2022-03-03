import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import { DEFAULT_NAME } from '../../../constants/feedbackConstants';
import convertDescription from '../../../helpers/convertDescriptionToObj';
import { testCart } from '../../../test-utils/dto/cartDto';
import feedbackDto from '../../../test-utils/dto/feedbackDto';
import productsDto from '../../../test-utils/dto/productsDto';
import usersDto from '../../../test-utils/dto/usersDto';
import { handleModal } from '../../../test-utils/feedback/feedbackHandlers';
import render, { screen } from '../../../test-utils/renderWith';
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

const initialUser = {
  user: { id: 1 },
};

describe('ProductDetailsPageContent', () => {
  describe('snapshots', () => {
    const server = setupServer(...handlersFulfilled);

    beforeAll(() => server.listen());
    afterAll(() => server.close());

    it('renders a valid snapshot', async () => {
      const product = {
        ...productsDto[0],
        description: convertDescription(productsDto[0].description),
      };
      const { asFragment, findByTestId } = render(
        <ProductDetailsPageContent product={product} />,
        { cart: testCart, user: initialUser }
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
    const product = {
      ...productsDto[2],
      description: convertDescription(productsDto[2].description),
    };
    const { getByTestId } = render(
      <ProductDetailsPageContent product={product} />,
      { cart: testCart, user: initialUser }
    );

    await screen.findByTestId('comments');

    expect(
      getByTestId('total-rating').querySelectorAll('[data-testid="StarIcon"]')
    ).toHaveLength(8);
  });

  it('should change total rating', async () => {
    const product = {
      ...productsDto[2],
      description: convertDescription(productsDto[2].description),
    };

    render(<ProductDetailsPageContent product={product} />, {
      cart: testCart,
      user: usersDto[3],
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
