import React from 'react';

import renderWithStore, {
  screen,
  fireEvent,
} from '../../../../../test-utils/renderWithStore';
import { Role } from '../../../../../ts/enums/enums';
import FeedbackModal from '../FeedbackModal';

const openModal = () => {
  fireEvent.click(screen.getByText('Add new feedback'));
};

describe('FeedbackModal snapshot:', () => {
  it('should render a valid snapshot', () => {
    const { getByRole } = renderWithStore(<FeedbackModal productId={4} />, {
      role: Role.Admin,
    });

    openModal();

    expect(getByRole('presentation')).toMatchSnapshot();
  });
});

describe('Closing functionality', () => {
  it('should close after close icon is pressed', () => {
    renderWithStore(<FeedbackModal productId={4} />, { role: Role.Admin });
    openModal();

    fireEvent.click(screen.getByTestId('CloseIcon'));
    expect(screen.getByText('Add new feedback')).toBeInTheDocument();
  });
});
