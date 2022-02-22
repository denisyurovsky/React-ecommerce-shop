import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export const StandartedTextField = ({
  value,
  onChange,
  labelText,
  error,
  helperText,
  disabled,
  autoComplete,
}) => {
  const [label, setLabel] = useState(false);

  const onInputFieldFocus = () => {
    setLabel(true);
  };

  const onInputFieldBlur = () => {
    setLabel(false);
  };

  return (
    <TextField
      onChange={onChange}
      onFocus={onInputFieldFocus}
      onBlur={onInputFieldBlur}
      value={value}
      label={labelText}
      variant="standard"
      InputLabelProps={{
        shrink: value.length || label,
      }}
      margin="normal"
      error={error}
      disabled={disabled}
      autoComplete={autoComplete}
      helperText={helperText}
      fullWidth
    />
  );
};

StandartedTextField.defaultProps = {
  autoComplete: 'on',
  error: false,
  helperText: '',
  disabled: false,
};

StandartedTextField.propTypes = {
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  helperText: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
