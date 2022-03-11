import userEvent from '@testing-library/user-event';
import React from 'react';

import usersDTO from '../../../../../../test-utils/dto/usersDto';
import render, {
  fireEvent,
  screen,
} from '../../../../../../test-utils/renderWith';
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
    const { asFragment } = render(<FeedbackForms sendForm={jest.fn()} />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Callback functionality', () => {
  const callback = jest.fn();
  const sendData = { rating: testRating, comment: testText, name: 'Anonymous' };
  const sendButton = ['button', { name: /Add feedback/i }];
  const checkboxName = ['checkbox', { name: /pasteName/i }];

  beforeEach(() => {
    render(<FeedbackForms sendForm={callback} />, { user: usersDTO[3] });
    fillForms(testRating, testText);
  });

  it('should be able to send form', () => {
    userEvent.click(screen.getByRole(...sendButton));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should be called with anonymous if no name is provided', () => {
    userEvent.click(screen.getByRole(...sendButton));
    expect(callback).toHaveBeenCalledWith(sendData);
  });

  it('should be called with anonymous by checkbox', () => {
    const checkbox = screen.getByRole(...checkboxName);

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    userEvent.click(screen.getByRole(...sendButton));
    expect(callback).toHaveBeenCalledWith(sendData);
  });

  it('should be called with userName', () => {
    const checkbox = screen.getByRole(...checkboxName);

    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    userEvent.click(screen.getByRole(...sendButton));
    expect(callback).toHaveBeenCalledWith({ ...sendData, name: 'Joe Doe' });
  });

  it('should be called with provided name', () => {
    const name = 'ivan';

    userEvent.type(screen.getByLabelText('Enter your name'), name);
    userEvent.click(screen.getByRole(...sendButton));

    expect(callback).toHaveBeenCalledWith({ ...sendData, name: name });
  });
});

describe('Loading state', () => {
  it('should display loading', () => {
    render(<FeedbackForms isLoading={true} sendForm={jest.fn()} />);

    expect(
      screen.getByRole('button', { name: /loading/i })
    ).toBeInTheDocument();
  });
});
