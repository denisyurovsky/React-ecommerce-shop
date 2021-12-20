import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authStatus } from '../../helpers/constants/authConstants';
import {
  getLoginState,
  getRegisterState,
  loginUser,
  registerUser,
  removeLockAfterTimeout,
  resetBlockedState,
} from '../../store/user/userSlice';

import AuthModal from './AuthModal';

const AuthModalContainer = () => {
  const { LOCKED } = authStatus;
  const dispatch = useDispatch();
  const loginStatus = useSelector(getLoginState);
  const registerStatus = useSelector(getRegisterState);
  const message = useSelector((state) => state.user.error);

  const sendLoginForm = ({ password, email }) => {
    dispatch(loginUser({ password, email }));
  };

  const sendRegisterForm = ({ email, password, ...info }) => {
    dispatch(registerUser({ email, password, ...info }));
  };

  if (loginStatus === LOCKED) {
    dispatch(removeLockAfterTimeout());
  }

  const resetError = () => dispatch(resetBlockedState());

  return (
    <AuthModal
      registerUser={sendRegisterForm}
      registerStatus={registerStatus}
      loginUser={sendLoginForm}
      loginStatus={loginStatus}
      errorMessage={message}
      resetError={resetError}
    />
  );
};

export default AuthModalContainer;
