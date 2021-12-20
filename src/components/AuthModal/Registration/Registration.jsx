import { Container, Box, TextField, Button } from '@mui/material/';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import checkEmailValidity from '../../../helpers/checkEmailValidity.js';
import checkPasswordValidity from '../../../helpers/checkPasswordValidity.js';
import {
  MIN_PASSWORD_LENGTH,
  authStatus,
  ERROR,
} from '../../../helpers/constants/authConstants.js';
import CustomLoadingButton from '../../ui-kit/buttons/CustomLoadingButton.jsx';
import PasswordForm from '../PasswordForm';
import useErrorHandler from '../useErrorHandler.js';

const { PENDING, FULFILLED, REJECTED, IDLE } = authStatus;

const Registration = ({ sendForm, errorMessage, status }) => {
  const isLoading = status === PENDING;
  const isError = status === REJECTED;
  const { isError: isServerError, resetError } = useErrorHandler(isError);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [checkValues, setCheckValues] = useState({
    isEmailValid: true,
    isPasswordValid: true,
    isConfirmPasswordValid: true,
  });

  const [isFinished, setIsFinished] = useState(false);

  const checkName = (name) => name.length > 0;
  const checkEmail = (email) => email.match(/@/);
  const checkPassword = (password) => password.length > MIN_PASSWORD_LENGTH;
  const checkMatch = (str1, str2) => str1 === str2;
  const checkIsFinished = ({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }) =>
    checkName(firstName) &&
    checkName(lastName) &&
    checkEmail(email) &&
    checkPassword(password) &&
    checkPassword(confirmPassword);

  const checkValidForm = ({ email, password, confirmPassword }) => {
    const isEmailValid = checkEmailValidity(email);
    const isPasswordValid = checkPasswordValidity(password);
    const isConfirmPasswordValid = checkMatch(password, confirmPassword);

    setCheckValues({
      isEmailValid,
      isPasswordValid,
      isConfirmPasswordValid,
    });

    return isEmailValid && isPasswordValid && isConfirmPasswordValid;
  };

  const preparetoSend = () => {
    if (checkValidForm({ ...values, confirmPassword })) {
      sendForm({ ...values });
    }
  };

  const onFirstNameChange = (e) => {
    const firstName = e.target.value;

    setIsFinished(checkIsFinished({ ...values, firstName, confirmPassword }));
    setValues({ ...values, firstName });
  };
  const onLastNameChange = (e) => {
    const lastName = e.target.value;

    setIsFinished(checkIsFinished({ ...values, lastName, confirmPassword }));
    setValues({ ...values, lastName });
  };
  const onEmailChange = (e) => {
    const email = e.target.value;

    setIsFinished(checkIsFinished({ ...values, email, confirmPassword }));
    resetError();
    setValues({ ...values, email });
  };
  const onPasswordChange = (e) => {
    const password = e.target.value;

    setIsFinished(checkIsFinished({ ...values, password, confirmPassword }));
    setValues({ ...values, password: e.target.value });
  };
  const onConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;

    setIsFinished(checkIsFinished({ ...values, confirmPassword }));
    setConfirmPassword(confirmPassword);
  };
  const onVisibilityChange = () => setShowPassword(!showPassword);

  const passwordError =
    !checkValues.isConfirmPasswordValid || !checkValues.isPasswordValid;

  const isEmailWrong = isServerError || !checkValues.isEmailValid;
  const emailMessage = isServerError ? errorMessage : 'Email is invalid';

  return (
    <Container>
      <TextField
        onChange={onFirstNameChange}
        value={values.firstName}
        label="First name"
        variant="standard"
        margin="normal"
        fullWidth
      />
      <TextField
        onChange={onLastNameChange}
        value={values.lastName}
        label="Last name"
        variant="standard"
        margin="normal"
        fullWidth
      />
      <TextField
        onChange={onEmailChange}
        value={values.email}
        error={isEmailWrong}
        helperText={isEmailWrong ? emailMessage : null}
        label="Email"
        variant="standard"
        margin="normal"
        fullWidth
      />
      <PasswordForm
        password={values.password}
        onChange={onPasswordChange}
        isError={passwordError}
        errorMessage={
          !checkValues.isConfirmPasswordValid
            ? "Passwords don't match"
            : 'Simple password'
        }
        hidden={!showPassword}
        onHiddenChange={onVisibilityChange}
      />
      <PasswordForm
        label="Confirm password"
        password={confirmPassword}
        onChange={onConfirmPasswordChange}
        isError={!checkValues.isConfirmPasswordValid}
        errorMessage="Passwords don't match"
        hidden={!showPassword}
        onHiddenChange={onVisibilityChange}
      />
      <Box sx={{ mt: 4 }} />
      {isLoading ? (
        <CustomLoadingButton label="Loading..." isFullWidth={true} />
      ) : (
        <Button
          fullWidth
          variant="contained"
          onClick={preparetoSend}
          disabled={!isFinished}
        >
          Sign up
        </Button>
      )}
    </Container>
  );
};

Registration.defaultProps = {
  status: IDLE,
  errorMessage: ERROR.REGISTER,
};

Registration.propTypes = {
  sendForm: PropTypes.func.isRequired,
  status: PropTypes.oneOf([PENDING, FULFILLED, REJECTED, IDLE]),
  errorMessage: PropTypes.string,
};

export default Registration;
