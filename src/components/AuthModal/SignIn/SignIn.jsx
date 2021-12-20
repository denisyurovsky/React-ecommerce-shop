import {
  Checkbox,
  FormControlLabel,
  TextField,
  Container,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  ERROR,
  MIN_PASSWORD_LENGTH,
  authStatus,
} from '../../../helpers/constants/authConstants';
import CustomLoadingButton from '../../ui-kit/buttons/CustomLoadingButton';
import PasswordForm from '../PasswordForm';
import useErrorHandler from '../useErrorHandler';

const { LOCKED, PENDING, FULFILLED, REJECTED, IDLE } = authStatus;

const SignIn = ({ sendForm, status, errorMessage }) => {
  const isLoading = status === authStatus.PENDING;
  const isLocked = status === authStatus.LOCKED;
  const isFailed = status === authStatus.REJECTED;
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
    setIsFinished(checkIsFinished(email, password));
  };

  const handleKeepChange = () => setIsKeep(!isKeep);

  const checkEmail = (email) => email.match(/@/);
  const checkPassword = (password) => password.length > MIN_PASSWORD_LENGTH;
  const checkIsFinished = (email, password) =>
    checkEmail(email) && checkPassword(password);

  const prepareToSend = () => sendForm({ password, email });

  return (
    <Container>
      <TextField
        error={isError}
        helperText={isError ? errorMessage : null}
        autoComplete="off"
        fullWidth
        variant="standard"
        margin="normal"
        label="Email"
        value={email}
        onChange={handleEmailChange}
        disabled={disabled}
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
        <CustomLoadingButton label="Loading..." isFullWidth={true} />
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
    </Container>
  );
};

SignIn.defaulProps = {
  errorMessage: ERROR.LOGIN,
  status: IDLE,
};

SignIn.propTypes = {
  sendForm: PropTypes.func.isRequired,
  status: PropTypes.oneOf([PENDING, FULFILLED, REJECTED, IDLE, LOCKED]),
  errorMessage: PropTypes.string,
};

export default SignIn;
