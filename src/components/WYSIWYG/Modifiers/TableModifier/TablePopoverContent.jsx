import { TextField, Button, Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { table } from '../../constants';

const { MAX_ROWS, INPUT_ERROR } = table;

const TablePopoverContent = ({ onClose, insertTable }) => {
  const [rows, setRows] = useState('');
  const [isError, setIsError] = useState(false);

  const checkMaxRows = (value) => value > MAX_ROWS;
  const isFinished = rows > 0 && !checkMaxRows(rows);

  const checkInput = (value) => value.match(/^\d{0,2}$/);

  const handleChange = (e) => {
    const value = e.target.value;

    if (checkInput(value)) {
      setRows(value);
    }

    setIsError(checkMaxRows(value));
  };

  const onSubmit = () => {
    insertTable(Number(rows));
    onClose();
  };

  return (
    <Box sx={{ p: 2, maxWidth: '250px' }}>
      <TextField
        sx={{ mb: 1 }}
        value={rows}
        onChange={handleChange}
        error={isError}
        helperText={isError ? INPUT_ERROR : ''}
        label="Number of rows"
        fullWidth
        autoComplete="off"
      />
      <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
        <Button
          onMouseDown={onSubmit}
          disabled={!isFinished}
          variant="contained"
        >
          Add table
        </Button>
        <Button onMouseDown={onClose} variant="outlined">
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

TablePopoverContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  insertTable: PropTypes.func.isRequired,
};

export default TablePopoverContent;
