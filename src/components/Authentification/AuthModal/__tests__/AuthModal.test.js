import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { authStatus } from '../../../../constants/authConstants';
import AuthModal from '../AuthModal';

const { FULFILLED } = authStatus;

const openModal = () => {
  const modalBtn = screen.getByTestId('btn-login');

  fireEvent.click(modalBtn);
};

describe('AuthModal snapshot', () => {
  it('should render a valid snapshot', () => {
    const { asFragment } = render(
      <AuthModal
        registerUser={() => {}}
        loginUser={() => {}}
        resetError={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Navigation functionality tests', () => {
  beforeEach(() => {
    render(
      <AuthModal
        registerUser={() => {}}
        loginUser={() => {}}
        resetError={() => {}}
      />
    );
    openModal();
  });

  it('should open a SignUp forms', () => {
    const navLoginBtn = screen.getByRole('tab', { selected: true });

    expect(navLoginBtn).toHaveAttribute('aria-selected', 'true');
  });

  it('should switch between SignUp and SigIn', () => {
    const navRegisterBtn = screen.getByRole('tab', { selected: false });
    const navLoginBtn = screen.getByRole('tab', { selected: true });

    expect(navLoginBtn).toHaveAttribute('aria-selected', 'true');
    expect(navRegisterBtn).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(navRegisterBtn);
    expect(navLoginBtn).toHaveAttribute('aria-selected', 'false');
    expect(navRegisterBtn).toHaveAttribute('aria-selected', 'true');
  });
});

describe('Closing functionality', () => {
  it('should close after closeIcon is pressed', () => {
    const { getByTestId, queryByRole } = render(
      <AuthModal
        loginUser={() => {}}
        registerUser={() => {}}
        resetError={() => {}}
      />
    );

    openModal();
    const cross = getByTestId('CloseIcon');

    fireEvent.click(cross);

    expect(queryByRole('presentation')).toBeNull();
  });

  it('should close after successful login', () => {
    const { queryByRole } = render(
      <AuthModal
        loginUser={() => {}}
        registerUser={() => {}}
        loginStatus={FULFILLED}
        resetError={() => {}}
      />
    );

    expect(queryByRole('presentation')).toBeNull();
  });

  it('should close after successful registration', () => {
    const { queryByRole } = render(
      <AuthModal
        loginUser={() => {}}
        registerUser={() => {}}
        registerStatus={FULFILLED}
        resetError={() => {}}
      />
    );

    expect(queryByRole('presentation')).toBeNull();
  });
});
