import userEvent from '@testing-library/user-event';
import React from 'react';

import users from '../../../test-utils/dto/usersDto';
import render, { fireEvent, screen } from '../../../test-utils/renderWith';
import ProfilePrivatePage from '../ProfilePrivatePage';

describe('ProfilePrivate component', () => {
  it('should show page not found', async () => {
    render(<ProfilePrivatePage />);

    expect(await screen.findByText('Page Not Found')).toBeInTheDocument();
  });

  beforeEach(() => render(<ProfilePrivatePage />, { user: users[1] }));

  it('should be able to edit user profile', async () => {
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const phoneNumberInput = screen.getByLabelText('Phone Number');

    userEvent.click(screen.getByRole('button', { name: /Edit profile/i }));

    userEvent.type(firstNameInput, 'ny');
    userEvent.type(lastNameInput, 'AndWesson');
    userEvent.type(phoneNumberInput, '79039876543210');

    userEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(firstNameInput).toHaveValue('Johnny');
    expect(lastNameInput).toHaveValue('SmithAndWesson');
    expect(phoneNumberInput).toHaveValue('+7 (903) 9876543');
  });

  it('should be able to edit gender', async () => {
    let inputElement = screen.getByDisplayValue('Male');

    userEvent.click(screen.getByRole('button', { name: /Edit profile/i }));
    fireEvent.mouseDown(screen.getAllByRole('button')[0]);
    fireEvent.click(await screen.findByText('Female'));
    expect(inputElement).toHaveValue('Female');
  });

  it('should be able to edit dateOfBirth', async () => {
    const dateOfBirthInput = screen.getByLabelText('Date Of Birth');

    expect(dateOfBirthInput).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Edit profile/i }));
    userEvent.click(dateOfBirthInput);
    fireEvent.mouseDown(screen.getAllByRole('button')[0]);
    fireEvent.click(await screen.findByText('15'));
    expect(dateOfBirthInput).toHaveValue('15.01.2000');
  });

  it('should be able to cancel edition', () => {
    userEvent.click(screen.getByRole('button', { name: /Edit profile/i }));
    const firstNameInput = screen.getByLabelText('First Name');

    userEvent.type(firstNameInput, 'ny');
    userEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(firstNameInput).toHaveValue('John');
  });

  it('should not make invalid edition', () => {
    userEvent.click(screen.getByRole('button', { name: /Edit profile/i }));
    const emailInput = screen.getByLabelText('Email');

    userEvent.type(emailInput, '{backspace}{backspace}{backspace}{backspace}');
    userEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(emailInput).toHaveValue('seller1@gmail.com');
  });
});
