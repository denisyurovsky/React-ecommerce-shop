import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import checkForLatinText from '../../../helpers/checkForLatinText';
import { DESCRIPTION_ERROR, LENGTH_ERROR } from '../constants';

const NameInput = ({ value, onChange, disableSubmit }) => {
  const [name, setName] = useState(value);
  const [isError, setIsError] = useState(false);

  const checkNameValidity = (name) =>
    checkForLatinText(name) && name.length !== 0;

  const onNameChange = (ev) => {
    const newName = ev.target.value;

    setName(newName);

    if (checkNameValidity(newName)) {
      setIsError(false);
      onChange(newName);

      return;
    }

    setIsError(true);
    disableSubmit();
  };

  let errorText = null;

  if (isError) {
    errorText = LENGTH_ERROR;

    if (name.length > 0) {
      errorText = DESCRIPTION_ERROR;
    }
  }

  return (
    <TextField
      label="Name"
      value={name}
      onChange={onNameChange}
      error={isError}
      helperText={isError ? errorText : null}
      fullWidth
    />
  );
};

NameInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disableSubmit: PropTypes.func.isRequired,
};

export default NameInput;
