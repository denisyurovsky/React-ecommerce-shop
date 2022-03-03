import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authStatus } from '../../constants/authConstants';
import {
  getLoginState,
  getRegisterState,
  loginUser,
  registerUser,
  removeLockAfterTimeout,
  resetError,
} from '../../store/user/userSlice';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';

import AuthModal from './AuthModal/AuthModal';

const { FULFILLED, LOCKED } = authStatus;

const Authentification = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(getLoginState);
  const registerStatus = useSelector(getRegisterState);
  const loginMessage = useSelector((state) => state.user.loginError);
  const registerMessage = useSelector((state) => state.user.registerError);

  const isLogged = loginStatus === FULFILLED || registerStatus === FULFILLED;

  const sendLoginForm = ({ password, email }) => {
    dispatch(loginUser({ password, email }));
  };

  const sendRegisterForm = ({ email, password, ...info }) => {
    dispatch(registerUser({ email, password, ...info }));
  };

  if (loginStatus === LOCKED) {
    dispatch(removeLockAfterTimeout());
  }

  const resetState = () => dispatch(resetError());

  return (
    <>
      {isLogged ? (
        <ProfileMenu />
      ) : (
        <AuthModal
          registerUser={sendRegisterForm}
          registerStatus={registerStatus}
          loginUser={sendLoginForm}
          loginStatus={loginStatus}
          loginErrorMessage={loginMessage}
          registerErrorMessage={registerMessage}
          resetError={resetState}
        />
      )}
    </>
  );
};

export default Authentification;
