import { TextField, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const LinkPopoverContent = ({ onClose, addEmail }) => {
  const [mail, setMail] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const checkInput = (text) => text.match(/@.+\..{2,}/);

  const handleChange = (e) => {
    const text = e.target.value;

    setIsFinished(checkInput(text));
    setMail(text);
  };

  const onSubmit = () => {
    addEmail(mail);
    onClose();
  };

  return (
    <Box sx={{ p: 2, maxWidth: '400px' }}>
      <TextField
        sx={{ mb: 1 }}
        value={mail}
        onChange={handleChange}
        label="E-mail"
        fullWidth
      />
      <Button
        sx={{ mr: 2 }}
        onMouseDown={onSubmit}
        disabled={!isFinished}
        variant="contained"
      >
        Insert
      </Button>
      <Button onMouseDown={onClose} variant="outlined">
        Cancel
      </Button>
    </Box>
  );
};

LinkPopoverContent.propTypes = {
  addEmail: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LinkPopoverContent;
