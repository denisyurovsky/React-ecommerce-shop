import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import isEmailValid from '../../helpers/isEmailValid';
import isPasswordValid from '../../helpers/isPasswordValid';

import styles from './Registration.module.scss';

const Registration = () => {
  const [values, setValues] = useState({
    showPassword: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isEmailValid: true,
    isPasswordValid: true,
    isConfirmPasswordValid: true,
    isFirstNameValid: true,
    isLastNameValid: true,
  });

  const validateForm = (
    email,
    password,
    confirmPassword,
    firstName,
    lastName
  ) => {
    const isFirstNameOk = firstName.length > 0;
    const isLastNameOk = lastName.length > 0;
    const isEmailOk = isEmailValid(email);
    const isPasswordOk = isPasswordValid(password);
    const isConfirmPasswordOk = password === confirmPassword;

    return setValues({
      ...values,
      isEmailValid: isEmailOk,
      isPasswordValid: isPasswordOk,
      isConfirmPasswordValid: isConfirmPasswordOk,
      isFirstNameValid: isFirstNameOk,
      isLastNameValid: isLastNameOk,
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const onFirstNameChange = (e) => {
    setValues({ ...values, firstName: e.target.value });
  };
  const onLastNameChange = (e) => {
    setValues({ ...values, lastName: e.target.value });
  };
  const onEmailChange = (e) => {
    setValues({ ...values, email: e.target.value });
  };
  const onPasswordChange = (e) => {
    setValues({ ...values, password: e.target.value });
  };
  const onConfirmPasswordChange = (e) => {
    setValues({ ...values, confirmPassword: e.target.value });
  };

  return (
    <Container
      className={styles.containerWrapper}
      maxWidth="sm"
      sx={{ m: 'auto' }}
    >
      <div className={styles.registrationContainer}>
        <TextField
          data-testid="firstNameInput"
          error={!values.isFirstNameValid}
          onChange={onFirstNameChange}
          label="First name"
          variant="standard"
        />
        <TextField
          data-testid="lastNameInput"
          error={!values.isLastNameValid}
          onChange={onLastNameChange}
          label="Last name"
          variant="standard"
        />
        <TextField
          data-testid="emailInput"
          onChange={onEmailChange}
          error={!values.isEmailValid}
          label="Email"
          variant="standard"
        />
        <FormControl variant="standard">
          <InputLabel
            error={!values.isPasswordValid}
            htmlFor="standard-adornment-password"
          >
            Password
          </InputLabel>
          <Input
            data-testid="passwordInput"
            type={values.showPassword ? 'text' : 'password'}
            onChange={onPasswordChange}
            error={!values.isPasswordValid}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  data-testid="hiddenButton"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel
            error={!values.isConfirmPasswordValid}
            htmlFor="standard-adornment-password"
          >
            Confirm Password
          </InputLabel>
          <Input
            data-testid="confirmPasswordInput"
            onChange={onConfirmPasswordChange}
            error={!values.isConfirmPasswordValid}
            type={values.showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          data-testid="signUpButton"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() =>
            validateForm(
              values.email,
              values.password,
              values.confirmPassword,
              values.firstName,
              values.lastName
            )
          }
        >
          Sign Up
        </Button>
      </div>
    </Container>
  );
};

export default Registration;
