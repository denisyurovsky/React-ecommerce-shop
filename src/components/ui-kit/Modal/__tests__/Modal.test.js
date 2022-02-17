import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MODAL_SIZES } from '../../../../helpers/constants/constants';
import Wrapper from '../test-utils/Wrapper';

describe('default modal functionality', () => {
  beforeEach(() => render(<Wrapper />));

  it('should open modal window', () => {
    userEvent.click(screen.getByRole('button', { name: /modal/i }));

    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it('should close modal window', () => {
    userEvent.click(screen.getByRole('button', { name: /modal/i }));
    userEvent.click(screen.getByTestId('CloseIcon'));

    expect(screen.queryByRole(/presentation/i)).toBeNull();
  });
});

describe('modal variations', () => {
  it('should render title', () => {
    const title = 'test text';

    render(
      <Wrapper
        title={title}
        onConfirm={() => {}}
        actionButtonLabel="Yes"
        size={MODAL_SIZES.SMALL}
      />
    );

    userEvent.click(screen.getByRole('button', { name: /modal/i }));

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should be able to provide buttons', () => {
    const onConfirm = jest.fn();
    const actionButtonLabel = 'Done';
    const cancelButtonLabel = 'no';

    render(
      <Wrapper
        onConfirm={onConfirm}
        actionButtonLabel={actionButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
      />
    );

    userEvent.click(screen.getByRole('button', { name: /modal/i }));
    userEvent.click(screen.getByRole('button', { name: cancelButtonLabel }));
    userEvent.click(screen.getByRole('button', { name: /modal/i }));
    userEvent.click(screen.getByRole('button', { name: actionButtonLabel }));

    expect(onConfirm).toHaveBeenCalled();
  });
});
