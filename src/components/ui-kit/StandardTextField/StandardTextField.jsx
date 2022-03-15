import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export const StandardTextField = ({
  id,
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
      id={id}
      onChange={onChange}
      onFocus={onInputFieldFocus}
      onBlur={onInputFieldBlur}
      value={value}
      label={labelText}
      variant="standard"
      InputLabelProps={{
        shrink: Boolean(value.length) || label,
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

StandardTextField.defaultProps = {
  id: null,
  autoComplete: 'on',
  error: false,
  helperText: '',
  disabled: false,
};

StandardTextField.propTypes = {
  id: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  helperText: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
