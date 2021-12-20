import CloseIcon from '@mui/icons-material/Close';
import { Tabs, Tab, Box, Modal, IconButton, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { authStatus } from '../../helpers/constants/authConstants';

import Registration from './Registration/Registration';
import SignIn from './SignIn/SignIn';

import styles from './authModal.module.scss';

const { FULFILLED, IDLE, LOADING, FAILED, LOCKED } = authStatus;

const AuthModal = ({
  registerUser,
  registerStatus,
  loginUser,
  loginStatus,
  errorMessage,
  resetError,
}) => {
  const [value, setValue] = useState('old');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event, newValue) => setValue(newValue);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const isLogged = loginStatus === FULFILLED || registerStatus === FULFILLED;

  const open =
    isOpen && loginStatus !== FULFILLED && registerStatus !== FULFILLED;

  return (
    <>
      {isLogged ? (
        <Button
          data-testid="btn-profile"
          className={styles.button}
          variant="outlined"
        >
          Profile
        </Button>
      ) : (
        <Button
          data-testid="btn-login"
          onClick={handleOpen}
          className={styles.button}
          variant="outlined"
        >
          Sign in
        </Button>
      )}
      <Modal open={open} onClose={handleClose} className={styles.container}>
        <Box className={styles.modal}>
          <Box>
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab
                label="Sign in"
                value="old"
                sx={{ width: 0.25, minWidth: 100 }}
                onClick={resetError}
              />
              <Tab
                label="Sign up"
                value="new"
                sx={{ width: 0.25, minWidth: 100 }}
                onClick={resetError}
              />
            </Tabs>
            <IconButton
              className={styles.cross}
              color="primary"
              onClick={handleClose}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box className={styles.forms}>
            {value === 'new' ? (
              <Registration
                sendForm={registerUser}
                status={registerStatus}
                errorMessage={errorMessage}
              />
            ) : (
              <SignIn
                sendForm={loginUser}
                status={loginStatus}
                errorMessage={errorMessage}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

AuthModal.defaultProps = {
  errorMessage: '',
  registerStatus: IDLE,
  loginStatus: IDLE,
};

AuthModal.propTypes = {
  resetError: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  registerStatus: PropTypes.oneOf([IDLE, LOADING, FULFILLED, FAILED]),
  loginStatus: PropTypes.oneOf([IDLE, LOADING, FULFILLED, FAILED, LOCKED]),
  errorMessage: PropTypes.string,
};

export default AuthModal;
