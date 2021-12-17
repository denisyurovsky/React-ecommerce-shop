import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Registration from './Registration';

afterEach(cleanup);

it('should take a snapshot', () => {
  const { asFragment } = render(<Registration />);

  expect(asFragment()).toMatchSnapshot();
});

describe('toggle password input', () => {
  it('toggles password input', () => {
    render(<Registration />);

    const toggleButton = screen.getByTestId('hiddenButton');

    const passwordInput = screen
      .getByTestId('passwordInput')
      .querySelector('input');

    userEvent.click(toggleButton);

    expect(passwordInput.getAttribute('type')).toBe('text');

    userEvent.click(toggleButton);

    expect(passwordInput.getAttribute('type')).toBe('password');
  });
});

describe('Successful registration scenario', () => {
  it('should log success message', () => {
    render(<Registration />);

    const firstNameInput = screen
      .getByTestId('firstNameInput')
      .querySelector('input');

    fireEvent.change(firstNameInput, { target: { value: 'Denis' } });

    const lastNameInput = screen
      .getByTestId('lastNameInput')
      .querySelector('input');

    fireEvent.change(lastNameInput, { target: { value: 'Iurovskii' } });

    const emailInput = screen.getByTestId('emailInput').querySelector('input');

    fireEvent.change(emailInput, { target: { value: 'denis@epam.com' } });

    const passwordInput = screen
      .getByTestId('passwordInput')
      .querySelector('input');

    fireEvent.change(passwordInput, { target: { value: 'AbcDefG12#' } });

    const confirmPasswordInput = screen
      .getByTestId('confirmPasswordInput')
      .querySelector('input');

    fireEvent.change(confirmPasswordInput, { target: { value: 'AbcDefG12#' } });

    userEvent.click(screen.getByTestId('signUpButton'));

    expect(firstNameInput.getAttribute('aria-invalid')).toBe('false');

    expect(lastNameInput.getAttribute('aria-invalid')).toBe('false');

    expect(emailInput.getAttribute('aria-invalid')).toBe('false');

    expect(passwordInput.getAttribute('aria-invalid')).toBe('false');

    expect(confirmPasswordInput.getAttribute('aria-invalid')).toBe('false');
  });
});

describe('failed registration scenarios', () => {
  describe('when first name is empty', () => {
    it('should not be empty', () => {
      render(<Registration />);

      const firstNameInput = screen
        .getByTestId('firstNameInput')
        .querySelector('input');

      fireEvent.change(firstNameInput, { target: { value: '' } });

      userEvent.click(screen.getByTestId('signUpButton'));

      expect(firstNameInput.getAttribute('aria-invalid')).toBe('true');
    });
  });
  describe('when last name is empty', () => {
    it('should not be empty', () => {
      render(<Registration />);

      const lastNameInput = screen
        .getByTestId('lastNameInput')
        .querySelector('input');

      fireEvent.change(lastNameInput, { target: { value: '' } });

      userEvent.click(screen.getByTestId('signUpButton'));

      expect(lastNameInput.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('when email is invalid', () => {
    it('should be valid', () => {
      render(<Registration />);

      const emailInput = screen
        .getByTestId('emailInput')
        .querySelector('input');

      fireEvent.change(emailInput, { target: { value: 'denis' } });

      userEvent.click(screen.getByTestId('signUpButton'));

      expect(emailInput.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('when password is invalid', () => {
    it('should be valid', () => {
      render(<Registration />);

      const passwordInput = screen
        .getByTestId('passwordInput')
        .querySelector('input');

      fireEvent.change(passwordInput, { target: { value: '12345678' } });

      userEvent.click(screen.getByTestId('signUpButton'));

      expect(passwordInput.getAttribute('aria-invalid')).toBe('true');
    });
  });
  describe('when confirm password does not match password', () => {
    it('should be same as password', () => {
      render(<Registration />);

      const passwordInput = screen
        .getByTestId('passwordInput')
        .querySelector('input');

      const confirmPasswordInput = screen
        .getByTestId('confirmPasswordInput')
        .querySelector('input');

      fireEvent.change(passwordInput, { target: { value: 'MoonWave$4' } });

      fireEvent.change(confirmPasswordInput, {
        target: { value: 'MoonWave$' },
      });

      userEvent.click(screen.getByTestId('signUpButton'));

      expect(confirmPasswordInput.getAttribute('aria-invalid')).toBe('true');
    });
  });
});
