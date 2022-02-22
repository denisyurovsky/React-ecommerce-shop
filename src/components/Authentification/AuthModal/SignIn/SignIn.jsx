import { Checkbox, FormControlLabel, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  MIN_PASSWORD_LENGTH,
  authStatus,
} from '../../../../constants/authConstants';
import LoadingButton from '../../../ui-kit/buttons/LoadingButton';
import { StandartedTextField } from '../../../ui-kit/StandartedTextField/StandartedTextField';
import PasswordForm from '../PasswordForm';
import useErrorHandler from '../useErrorHandler';

const { LOCKED, PENDING, FULFILLED, REJECTED, IDLE } = authStatus;

const SignIn = ({ sendForm, status, errorMessage }) => {
  const isLoading = status === PENDING;
  const isLocked = status === LOCKED;
  const isFailed = status === REJECTED;
  const disabled = isLocked || isLoading;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeep, setIsKeep] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { isError, resetError } = useErrorHandler(isFailed || isLocked);

  const handleEmailChange = (e) => {
    const input = e.target.value;

    setEmail(input);
    resetError();
    setIsFinished(checkIsFinished(input, password));
  };

  const handlePasswordChange = (e) => {
    const input = e.target.value;

    setPassword(input);
    resetError();

    e.target.hasAttribute('autocompleted')
      ? setIsFinished(true)
      : setIsFinished(checkIsFinished(email, password));
  };

  const handleKeepChange = () => setIsKeep(!isKeep);

  const checkEmail = (email) => email.match(/@/);
  const checkPassword = (password) => password.length > MIN_PASSWORD_LENGTH;
  const checkIsFinished = (email, password) =>
    checkEmail(email) && checkPassword(password);

  const prepareToSend = () => sendForm({ password, email });

  return (
    <Box>
      <StandartedTextField
        onChange={handleEmailChange}
        disabled={disabled}
        autoComplete="off"
        error={isError}
        helperText={isError ? errorMessage : null}
        labelText="Email"
        value={email}
      />
      <PasswordForm
        isError={isError}
        errorMessage={errorMessage}
        password={password}
        onChange={handlePasswordChange}
        disabled={disabled}
      />
      <FormControlLabel
        sx={{ mb: 1 }}
        control={<Checkbox onChange={handleKeepChange} checked={isKeep} />}
        label="Remember me"
        disabled={disabled}
      />

      {isLoading ? (
        <LoadingButton label="Loading..." isFullWidth={true} />
      ) : (
        <Button
          fullWidth
          variant="contained"
          onClick={prepareToSend}
          disabled={!isFinished || isLocked}
        >
          Sign in
        </Button>
      )}
    </Box>
  );
};

SignIn.defaulProps = {
  errorMessage: '',
  status: IDLE,
};

SignIn.propTypes = {
  sendForm: PropTypes.func.isRequired,
  status: PropTypes.oneOf([PENDING, FULFILLED, REJECTED, IDLE, LOCKED]),
  errorMessage: PropTypes.string,
};

export default SignIn;
