import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import React from 'react';

import {
  MAX_LOGIN_ATTEMPTS,
  LOCK_TIMEOUT,
  ERROR,
} from '../../../helpers/constants/authConstants';
import userReducer from '../../../store/user/userSlice';
import render, { screen } from '../../../test-utils/test-utils';
import AuthModalContainer from '../AuthModalContainer';

const successfulHandlers = [
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.json({
        accessToken: 'mocked_user_token_login',
      }),
      ctx.delay(150)
    );
  }),
  rest.post('/register', (req, res, ctx) => {
    return res(
      ctx.json({
        accessToken: 'mocked_user_token_register',
      }),
      ctx.delay(150)
    );
  }),
];

const failedHandlers = [
  rest.post('/login', (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: 'Request failed with status code 400' })
    );
  }),
  rest.post('/register', (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: 'Request failed with status code 400' })
    );
  }),
];

const sendLoginRequest = () => {
  userEvent.click(screen.getByTestId('btn-login'));
  fillInLoginForms();
  userEvent.click(screen.getByRole('button', { name: /sign in/i }));
};

const fillInLoginForms = () => {
  userEvent.type(screen.getByLabelText('Email'), 'ivan@yandex.ru');
  userEvent.type(screen.getByLabelText('Password'), 'password');
};

const sendRegisterRequest = () => {
  userEvent.click(screen.getByTestId('btn-login'));
  userEvent.click(screen.getByRole('tab', { name: /sign up/i }));
  fillInRegisterForms();
  userEvent.click(screen.getByRole('button', { name: /sign up/i }));
};

const fillInRegisterForms = () => {
  userEvent.type(screen.getByLabelText('First name'), 'Ivan');
  userEvent.type(screen.getByLabelText('Last name'), 'Ivn');
  userEvent.type(screen.getByLabelText('Email'), 'ivan@yandex.ru');
  userEvent.type(screen.getByLabelText('Password'), 'AbcDefG12!');
  userEvent.type(screen.getByLabelText('Confirm password'), 'AbcDefG12!');
};

describe('Successfull login and register', () => {
  const server = setupServer(...successfulHandlers);

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    const store = configureStore({
      reducer: { user: userReducer },
    });

    render(<AuthModalContainer />, store);
    localStorage.clear();
  });

  it('should allow user to login', async () => {
    sendLoginRequest();

    await screen.findByTestId('btn-profile');

    expect(localStorage.getItem('accessToken')).toBe('mocked_user_token_login');
  });

  it('should allow user to register', async () => {
    sendRegisterRequest();

    await screen.findByTestId('btn-profile');

    expect(localStorage.getItem('accessToken')).toEqual(
      'mocked_user_token_register'
    );
  });
});

describe('Failed server:', () => {
  const server = setupServer(...failedHandlers);

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  describe('Failed login and register:', () => {
    beforeEach(() => {
      const store = configureStore({
        reducer: { user: userReducer },
      });

      render(<AuthModalContainer />, store);
      localStorage.clear();
    });

    it('should not allow user to login with wrong data', async () => {
      sendLoginRequest();

      const errorMess = await screen.findAllByText(ERROR.LOGIN);

      expect(errorMess).toHaveLength(2);
      expect(localStorage.getItem('accessToken')).toBeNull();
    });

    it('should be able to detect incorrect data in sign up', async () => {
      sendRegisterRequest();

      const errorMess = await screen.findByText(ERROR.REGISTER);

      expect(errorMess).toBeInTheDocument();
      expect(localStorage.getItem('accessToken')).toBeNull();
    });
  });

  describe('Locked login state:', () => {
    const createLockedState = async () => {
      sendLoginRequest();

      for (let i = 0; i < MAX_LOGIN_ATTEMPTS - 1; i++) {
        await screen.findAllByText(ERROR.LOGIN);

        userEvent.click(screen.getByRole('button', { name: /sign in/i }));
      }
    };

    beforeEach(() => {
      const store = configureStore({
        reducer: { user: userReducer },
      });

      render(<AuthModalContainer />, store);
      localStorage.clear();
    });

    it('should display error', async () => {
      await createLockedState();
      expect(await screen.findAllByText(ERROR.LOCK)).toHaveLength(2);

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(screen.getByRole('presentation')).toMatchSnapshot();
    });

    it('should unlock forms after delay', async () => {
      await createLockedState();
      expect(await screen.findAllByText(ERROR.LOCK)).toHaveLength(2);

      setTimeout(() => {
        expect(screen.queryAllByText(ERROR.LOCK)).toHaveLength(0);
        expect(screen.getByRole('presentation')).toMatchSnapshot();
      }, LOCK_TIMEOUT);

      jest.advanceTimersByTime(LOCK_TIMEOUT);
    });
  });
});
