import { render } from '@testing-library/react';
import React from 'react';

import { EMPTY } from '../../../../../constants/constants';
import feedbackDto from '../../../../../test-utils/dto/feedbackDto';
import CommentSection from '../CommentSection';

describe('empty feedbacks section', () => {
  it('should show correct message', () => {
    const { getByText } = render(
      <CommentSection comments={[]} message={EMPTY.NO_COMMENTS_BE_THE_FIRST} />
    );

    expect(getByText(EMPTY.NO_COMMENTS_BE_THE_FIRST)).toBeInTheDocument();
  });
});

describe('full feedback section', () => {
  it('should render product comments', async () => {
    const { asFragment } = render(
      <CommentSection
        comments={feedbackDto.splice(0, 2)}
        message={EMPTY.NO_COMMENTS_BE_THE_FIRST}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
