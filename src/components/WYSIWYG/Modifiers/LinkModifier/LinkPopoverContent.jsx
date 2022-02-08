import { TextField, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { LINK_PREDEFINED_TEXT } from '../../constants';

const LinkPopoverContent = ({ onClose, addLink }) => {
  const [link, setLink] = useState(LINK_PREDEFINED_TEXT);
  const [linkText, setLinkText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const checkLink = (link) => link.length > 9;
  const checkText = (text) => text.length > 0;
  const checkForms = (link, text) => checkLink(link) && checkText(text);

  const handleLinkChange = (e) => {
    const link = e.target.value;

    setIsFinished(checkForms(link, linkText));
    setLink(link);
  };

  const handleLinkTextChange = (e) => {
    const text = e.target.value;

    setIsFinished(checkForms(link, text));
    setLinkText(text);
  };

  const onSubmit = () => {
    addLink(linkText, link);
    onClose();
  };

  return (
    <Box sx={{ p: 2, maxWidth: '400px' }}>
      <TextField
        sx={{ mb: 1 }}
        value={link}
        onChange={handleLinkChange}
        label="Insert hyperlink"
        fullWidth
        autoComplete="off"
      />
      <TextField
        sx={{ mb: 1 }}
        value={linkText}
        onChange={handleLinkTextChange}
        label="Displayed text"
        fullWidth
        autoComplete="off"
      />
      <Button
        sx={{ mr: 2 }}
        onMouseDown={onSubmit}
        disabled={!isFinished}
        variant="contained"
      >
        Add link
      </Button>
      <Button onMouseDown={onClose} variant="outlined">
        Cancel
      </Button>
    </Box>
  );
};

LinkPopoverContent.propTypes = {
  onClose: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
};

export default LinkPopoverContent;
