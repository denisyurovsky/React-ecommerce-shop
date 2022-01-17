import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import FeedbackForms from '../FeedbackForms';
import getStarByNumber from '../getStarByNumber';

const testRating = 4;
const testText =
  'Sint esse elit id magna qui aliquip commodo aliquip esse amet velit esse ut cupidatat.';

const fillForms = (rating, text) => {
  const comment = screen.getByLabelText('Comment');

  fireEvent.click(getStarByNumber(rating), { bubbles: true });
  userEvent.type(comment, text);
};

describe('FeedbackForms snapshot:', () => {
  it('should render a valid snapshot', () => {
    const { asFragment } = render(<FeedbackForms sendForm={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Callback functionality', () => {
  const callback = jest.fn();

  beforeEach(() => {
    render(<FeedbackForms sendForm={callback} />);
  });

  it('should be able to send form', () => {
    fillForms(testRating, testText);
    userEvent.click(screen.getByRole('button', { name: /Add feedback/i }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should be called with anonymous if no name is provided', () => {
    fillForms(testRating, testText);
    userEvent.click(screen.getByRole('button', { name: /Add feedback/i }));

    expect(callback).toHaveBeenCalledWith({
      name: 'Anonymous',
      rating: testRating,
      comment: testText,
    });
  });

  it('should be called with provided name', () => {
    const name = 'ivan';

    fillForms(testRating, testText);
    userEvent.type(screen.getByLabelText('Enter your name'), name);
    userEvent.click(screen.getByRole('button', { name: /Add feedback/i }));

    expect(callback).toHaveBeenCalledWith({
      name: name,
      rating: testRating,
      comment: testText,
    });
  });
});

describe('Loading state', () => {
  it('should display loading', () => {
    render(<FeedbackForms isLoading={true} sendForm={() => {}} />);

    expect(
      screen.getByRole('button', { name: /loading/i })
    ).toBeInTheDocument();
  });
});
