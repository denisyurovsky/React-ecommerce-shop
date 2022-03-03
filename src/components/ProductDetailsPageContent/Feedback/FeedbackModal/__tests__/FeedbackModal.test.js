import React from 'react';

import { USER_ROLE } from '../../../../../constants/constants';
import renderWithStore, {
  screen,
  fireEvent,
} from '../../../../../test-utils/renderWithStore';
import FeedbackModal from '../FeedbackModal';

const openModal = () => {
  fireEvent.click(screen.getByText('Add new feedback'));
};

describe('FeedbackModal snapshot:', () => {
  it('should render a valid snapshot', () => {
    const { getByRole } = renderWithStore(<FeedbackModal productId={4} />, {
      role: USER_ROLE.ADMIN,
    });

    openModal();

    expect(getByRole('presentation')).toMatchSnapshot();
  });
});

describe('Closing functionality', () => {
  it('should close after close icon is pressed', () => {
    renderWithStore(<FeedbackModal productId={4} />, { role: USER_ROLE.ADMIN });
    openModal();

    fireEvent.click(screen.getByTestId('CloseIcon'));
    expect(screen.getByText('Add new feedback')).toBeInTheDocument();
  });
});
