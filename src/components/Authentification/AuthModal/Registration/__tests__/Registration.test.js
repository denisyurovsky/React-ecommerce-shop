import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { authStatus } from '../../../../../constants/authConstants';
import Registration from '../Registration';

const { PENDING, REJECTED } = authStatus;

describe('Registration snapshot', () => {
  it('should render a valid snapshot', () => {
    const { asFragment } = render(<Registration sendForm={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('toggle password input simultaneously', () => {
  beforeEach(() => {
    render(<Registration sendForm={() => {}} />);
  });

  it('should hide both password inputs by default', () => {
    const password = screen.getByLabelText('Password');
    const confPassword = screen.getByLabelText('Confirm password');

    expect(password.getAttribute('type')).toBe('password');
    expect(confPassword.getAttribute('type')).toBe('password');
  });

  describe('show both password inputs', () => {
    const getCheckbox = (index) => {
      const password = screen.getByLabelText('Password');
      const confPassword = screen.getByLabelText('Confirm password');
      const checkbox = screen
        .getAllByTestId('visibility')
        .map((el) => el.querySelector('input'))
        .find((el, i) => i === index);

      return { checkbox, password, confPassword };
    };

    it('should work with first checkbox', () => {
      const { checkbox, password, confPassword } = getCheckbox(0);

      userEvent.click(checkbox);

      expect(password.getAttribute('type')).toBe('text');
      expect(confPassword.getAttribute('type')).toBe('text');
    });

    it('should work with second checkbox', () => {
      const { checkbox, password, confPassword } = getCheckbox(1);

      userEvent.click(checkbox);

      expect(password.getAttribute('type')).toBe('text');
      expect(confPassword.getAttribute('type')).toBe('text');
    });
  });
});

describe('Successful registration scenario', () => {
  it('should log success message', () => {
    const callback = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Registration sendForm={callback} />
    );

    userEvent.type(getByLabelText('First name'), 'Denis');
    userEvent.type(getByLabelText('Last name'), 'Iurovskii');
    userEvent.type(getByLabelText('Email'), 'denis@epam.com');
    userEvent.type(getByLabelText('Password'), 'AbcDefG12!');
    userEvent.type(getByLabelText('Confirm password'), 'AbcDefG12!');
    userEvent.click(getByRole('button', { name: /sign up/i }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should display loading button', () => {
    const { getByRole } = render(
      <Registration sendForm={() => {}} status={PENDING} />
    );

    expect(getByRole('button', { name: /loading/i })).toBeInTheDocument();
  });
});

describe('Errors in password validation', () => {
  const fillInputs = () => {
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');

    userEvent.type(screen.getByLabelText('First name'), 'Denis');
    userEvent.type(screen.getByLabelText('Last name'), 'Iurovskii');
    userEvent.type(screen.getByLabelText('Email'), 'denis@epam.com');

    return { passwordInput, confirmPasswordInput };
  };

  beforeEach(() => {
    render(<Registration sendForm={() => {}} />);
  });

  it('should be same passwords', () => {
    const { passwordInput, confirmPasswordInput } = fillInputs();

    userEvent.type(passwordInput, 'AbcDefG12');
    userEvent.type(confirmPasswordInput, 'Mssdasgh1!');
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(passwordInput.getAttribute('aria-invalid')).toBe('true');
    expect(confirmPasswordInput.getAttribute('aria-invalid')).toBe('true');
    expect(screen.queryAllByText("Passwords don't match")).toHaveLength(2);
  });

  it('should show simple error message', () => {
    const { passwordInput, confirmPasswordInput } = fillInputs();

    userEvent.type(passwordInput, 'AbcDefG12');
    userEvent.type(confirmPasswordInput, 'AbcDefG12');
    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      screen.getByText(
        'Should contain upper case letters, special symbols, digits and be at least 8 symbols in length.'
      )
    ).toBeInTheDocument();
  });
});

describe('Email validation', () => {
  it('should display server error', () => {
    const serverError = 'Testin server error';
    const { getByText } = render(
      <Registration
        sendForm={() => {}}
        status={REJECTED}
        errorMessage={serverError}
      />
    );

    expect(getByText(serverError)).toBeInTheDocument();
  });

  it('should display email validation error', () => {
    const { getByLabelText, getByRole } = render(
      <Registration sendForm={() => {}} />
    );

    userEvent.type(getByLabelText('First name'), 'Denis');
    userEvent.type(getByLabelText('Last name'), 'Iurovskii');
    userEvent.type(getByLabelText('Email'), 'denis@epam');
    userEvent.type(getByLabelText('Password'), 'Mssdasgh1!');
    userEvent.type(getByLabelText('Confirm password'), 'Mssdasgh1!');
    userEvent.click(getByRole('button', { name: /sign up/i }));

    expect(screen.getByText('Email is invalid')).toBeInTheDocument();
  });
});
