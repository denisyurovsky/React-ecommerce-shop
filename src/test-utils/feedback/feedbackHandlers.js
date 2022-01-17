import userEvent from '@testing-library/user-event';

import getStarByNumber from '../../components/ProductDetailsPageContent/Feedback/FeedbackModal/FeedbackForms/getStarByNumber';
import { screen, fireEvent } from '../renderWithStore';

export const handleModal = ({ name = null, rating = 3 }) => {
  userEvent.click(screen.getByRole('button', { name: /add new feedback/i }));
  fillForms(name, rating);
  userEvent.click(screen.getByRole('button', { name: /add feedback/i }));
};

const fillForms = (name, rating) => {
  const text =
    'Need to be 30 symbols in length to unlock send button Duis cillum elit elit et sit et aliqua sit et mollit ex labore veniam.';

  if (name) {
    userEvent.type(screen.getByLabelText('Enter your name'), name);
  }
  userEvent.type(screen.getByLabelText('Comment'), text);
  fireEvent.click(getStarByNumber(rating));
};
