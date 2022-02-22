import { VisibilityOff, Visibility } from '@mui/icons-material';
import { Checkbox, TextField, InputAdornment } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

const PasswordForm = ({
  label,
  isError,
  errorMessage,
  password,
  onChange,
  disabled,
  hidden,
  onHiddenChange,
}) => {
  const [isHidden, setIsHidden] = useState(hidden);
  const [labelFocus, setLabelFocus] = useState(false);

  const onInputPasswrodFocus = () => {
    setLabelFocus(true);
  };

  const onInputPasswordBlur = () => {
    setLabelFocus(false);
  };

  const changeVisibility = () => {
    setIsHidden(!isHidden);
    onHiddenChange();
  };

  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  return (
    <TextField
      error={isError}
      helperText={isError ? errorMessage : null}
      autoComplete="off"
      fullWidth
      variant="standard"
      margin="normal"
      label={label}
      InputLabelProps={{ shrink: password.length || labelFocus }}
      onFocus={onInputPasswrodFocus}
      onBlur={onInputPasswordBlur}
      value={password}
      onChange={onChange}
      type={isHidden ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Checkbox
              data-testid="visibility"
              icon={<Visibility />}
              checkedIcon={<VisibilityOff />}
              checked={isHidden}
              onChange={changeVisibility}
              disabled={disabled}
            />
          </InputAdornment>
        ),
      }}
      disabled={disabled}
    />
  );
};

PasswordForm.defaultProps = {
  label: 'Password',
  isError: false,
  errorMessage: null,
  disabled: false,
  hidden: true,
  onHiddenChange: () => {},
};

PasswordForm.propTypes = {
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  onHiddenChange: PropTypes.func,
};

export default PasswordForm;
