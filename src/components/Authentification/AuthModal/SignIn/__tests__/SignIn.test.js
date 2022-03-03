import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { authStatus } from '../../../../../constants/authConstants';
import SignIn from '../SignIn';

const { REJECTED, PENDING, LOCKED } = authStatus;

const fillForms = (emailValue, passwordValue) => {
  const btn = screen.getByRole('button');
  const email = screen.getByLabelText('Email');
  const password = screen.getByLabelText('Password');

  userEvent.type(email, emailValue);
  userEvent.type(password, passwordValue);

  return { btn, email, password };
};

const getInputs = () => {
  const { btn, email, password } = fillForms('look@', 'theP');
  const rememberMeCheck = screen.getByLabelText('Remember me');
  const visibilityCheck = screen
    .getByTestId('visibility')
    .querySelector('input[type="checkbox"]');
  const arrayOfInputs = [
    btn,
    email,
    password,
    rememberMeCheck,
    visibilityCheck,
  ];

  return {
    btn,
    email,
    password,
    visibilityCheck,
    rememberMeCheck,
    arrayOfInputs,
  };
};

const errorMessage = 'Testing error message...';

describe('SignIn snapshot:', () => {
  it('should render a valid snapshot', () => {
    const { asFragment } = render(<SignIn sendForm={() => {}} />);

    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Send form button tests:', () => {
  const callback = jest.fn();

  beforeEach(() => {
    render(<SignIn sendForm={callback} />);
  });

  it('should have active state', () => {
    const login = 'ivan@ya';
    const passwordValue = 'pass';
    const { btn, email, password } = fillForms(login, passwordValue);

    expect(email.value).toBe(login);
    expect(password.value).toBe(passwordValue);
    expect(btn.disabled).toBe(false);
  });

  it('should send form with correct credentials', () => {
    const email = 'petr@';
    const password = 'weak';
    const { btn } = fillForms(email, password);

    fireEvent.click(btn);
    expect(callback).toBeCalledWith({ email, password });
  });
});

describe('Test lock state', () => {
  beforeEach(() => {
    render(
      <SignIn sendForm={() => {}} status={LOCKED} errorMessage={errorMessage} />
    );
  });

  it('should lock all inputs', () => {
    const { arrayOfInputs } = getInputs();

    arrayOfInputs.forEach((el) => {
      expect(el.disabled).toBe(true);
    });
  });

  it('should display error message', () => {
    expect(screen.getAllByText(errorMessage)).toHaveLength(2);
  });
});

describe('Test loading state', () => {
  beforeEach(() => {
    render(
      <SignIn
        sendForm={() => {}}
        status={PENDING}
        errorMessage={errorMessage}
      />
    );
  });

  it('should lock all inputs', () => {
    const { arrayOfInputs } = getInputs();

    arrayOfInputs.forEach((el) => {
      expect(el.disabled).toBe(true);
    });
  });

  it('should change button text', () => {
    expect(screen.getByRole('button')).toHaveTextContent(/loading/i);
  });

  it('should not display error', () => {
    expect(screen.queryAllByText(errorMessage)).toHaveLength(0);
  });
});

describe('Test error state', () => {
  beforeEach(() => {
    render(
      <SignIn
        sendForm={() => {}}
        errorMessage={errorMessage}
        status={REJECTED}
      />
    );
  });

  it('should remove error message after user types something', () => {
    const { email } = getInputs();

    userEvent.type(email, 'k');
    expect(screen.queryAllByText(errorMessage)).toHaveLength(0);
  });

  describe('snapshot', () => {
    it('should show error and do not disable inputs', () => {
      const { container } = render(
        <SignIn
          sendForm={() => {}}
          errorMessage={errorMessage}
          status={REJECTED}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });
});

describe('Test base state', () => {
  beforeEach(() => {
    render(<SignIn sendForm={() => {}} />);
  });

  it('Checkbox remember me should work', () => {
    const rememberMeCheck = screen.getByLabelText('Remember me');

    expect(rememberMeCheck.checked).toBe(false);
    fireEvent.click(rememberMeCheck);
    expect(rememberMeCheck.checked).toBe(true);
  });
});
