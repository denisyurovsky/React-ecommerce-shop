import { Tabs, Tab, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { authStatus } from '../../../constants/authConstants';
import Modal from '../../ui-kit/Modal/Modal';

import Registration from './Registration/Registration';
import SignIn from './SignIn/SignIn';

import styles from './authModal.module.scss';

const { FULFILLED, IDLE, PENDING, REJECTED, LOCKED } = authStatus;

const AuthModal = ({
  registerUser,
  registerStatus,
  loginUser,
  loginStatus,
  loginErrorMessage,
  registerErrorMessage,
  resetError,
}) => {
  const [value, setValue] = useState('old');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event, newValue) => {
    resetError();
    setValue(newValue);
  };
  const handleClose = () => {
    resetError();
    setIsOpen(false);
  };
  const handleOpen = () => setIsOpen(true);

  const open =
    isOpen && loginStatus !== FULFILLED && registerStatus !== FULFILLED;

  return (
    <>
      <Button
        data-testid="btn-login"
        onClick={handleOpen}
        variant="outlined"
        color="secondary"
      >
        Sign in
      </Button>
      <Modal isOpen={open} onClose={handleClose}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          className={styles.navigation}
        >
          <Tab
            label="Sign in"
            value="old"
            sx={{ width: 0.25, minWidth: 100 }}
          />
          <Tab
            label="Sign up"
            value="new"
            sx={{ width: 0.25, minWidth: 100 }}
          />
        </Tabs>
        <Box className={styles.content}>
          {value === 'new' ? (
            <Registration
              sendForm={registerUser}
              status={registerStatus}
              errorMessage={registerErrorMessage}
            />
          ) : (
            <SignIn
              sendForm={loginUser}
              status={loginStatus}
              errorMessage={loginErrorMessage}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

AuthModal.defaultProps = {
  registerErrorMessage: '',
  loginErrorMessage: '',
  registerStatus: IDLE,
  loginStatus: IDLE,
};

AuthModal.propTypes = {
  resetError: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  registerStatus: PropTypes.oneOf([IDLE, PENDING, FULFILLED, REJECTED]),
  loginStatus: PropTypes.oneOf([IDLE, PENDING, FULFILLED, REJECTED, LOCKED]),
  loginErrorMessage: PropTypes.string,
  registerErrorMessage: PropTypes.string,
};

export default AuthModal;
