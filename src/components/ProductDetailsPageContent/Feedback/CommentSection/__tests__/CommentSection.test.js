import { render } from '@testing-library/react';
import React from 'react';

import feedbackDto from '../../../../../test-utils/dto/feedbackDto';
import CommentSection from '../CommentSection';

describe('empty feedbacks section', () => {
  it('should show correct message', () => {
    const { getByText } = render(<CommentSection comments={[]} />);

    expect(
      getByText('There are no comments yet. Be the first to review')
    ).toBeInTheDocument();
  });
});

describe('full feedback section', () => {
  it('should render product comments', async () => {
    const { asFragment } = render(
      <CommentSection comments={feedbackDto.splice(0, 2)} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
