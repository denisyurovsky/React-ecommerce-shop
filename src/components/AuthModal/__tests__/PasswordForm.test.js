import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import PasswordForm from '../PasswordForm';

describe('PasswordForm snapshot:', () => {
  it('should render a valid snapshot', () => {
    const { asFragment } = render(
      <PasswordForm password="" onChange={() => {}} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Password field tests:', () => {
  beforeEach(() => {
    render(<PasswordForm password="weakpassword" onChange={() => {}} />);
  });

  it('should be able to hide password', () => {
    const input = screen.getByLabelText('Password');
    const checkbox = screen
      .getByTestId('visibility')
      .querySelector('input[type="checkbox"]');

    expect(checkbox.checked).toEqual(true);
    expect(input.value).toHaveLength(12);
  });

  it('should be able to show password', () => {
    const input = screen.getByLabelText('Password');
    const checkbox = screen
      .getByTestId('visibility')
      .querySelector('input[type="checkbox"]');

    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
    expect(input.value).toBe('weakpassword');
  });
});

describe('Error message tests:', () => {
  test('It should show errorMessage', () => {
    const errorText = 'Incorrect';

    render(
      <PasswordForm
        password=""
        onChange={() => {}}
        isError={true}
        errorMessage={errorText}
      />
    );
    const field = screen.getByText(errorText);

    expect(field).toBeInTheDocument();
  });
});
