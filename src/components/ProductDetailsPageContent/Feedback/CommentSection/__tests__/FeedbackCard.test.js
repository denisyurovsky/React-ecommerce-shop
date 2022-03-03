import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MAX_SHOWN_SYMBOLS } from '../../../../../constants/feedbackConstants';
import feedbackDto from '../../../../../test-utils/dto/feedbackDto';
import FeedbackCard from '../FeedbackCard';

describe('long comment', () => {
  const longFeedback = feedbackDto[2];
  const shortenVersion = `${longFeedback.comment.slice(
    0,
    MAX_SHOWN_SYMBOLS
  )}...`;

  beforeEach(() => {
    render(<FeedbackCard review={longFeedback} />);
  });

  it(`should show ${MAX_SHOWN_SYMBOLS} symbols`, () => {
    expect(screen.getByText(shortenVersion)).toBeInTheDocument();
  });

  it('should show all comment after read more click', () => {
    userEvent.click(screen.getByRole('button', { name: /read more/i }));

    expect(screen.getByText(longFeedback.comment)).toBeInTheDocument();
  });

  it('should hide comment after click', () => {
    userEvent.click(screen.getByRole('button', { name: /read more/i }));
    userEvent.click(screen.getByTestId('toggleVisibility'));

    expect(screen.getByText(shortenVersion)).toBeInTheDocument();
  });
});
