import { Mail } from '@mui/icons-material';
import { Popover, Button, Box } from '@mui/material';
import { EditorState, Modifier } from 'draft-js';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { TYPES } from '../../constants';
import createDecorator from '../../Decorators/Decorators';

import EmailPopoverContent from './EmailPopoverContent';

const EmailModifier = ({ state, handleChange, setIsInteracted, disabled }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpened = Boolean(anchorEl);

  const openForms = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setIsInteracted(true);
  };
  const closeForms = () => {
    setIsInteracted(false);
    setAnchorEl(null);
  };

  const addEmail = (mail) => {
    const currentContent = state.getCurrentContent();
    const contentStateWithEntity = currentContent.createEntity(
      TYPES.EMAIL,
      'UNMUTABLE',
      {
        address: mail,
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const textWithEntity = Modifier.replaceText(
      currentContent,
      state.getSelection(),
      mail,
      null,
      entityKey
    );

    const stateWithContent = EditorState.createWithContent(
      textWithEntity,
      createDecorator()
    );

    const startSelection = state.getSelection();
    const startOffset = startSelection.getStartOffset();
    const endOffset = startOffset + mail.length;
    const newSelection = startSelection
      .set('anchorOffset', endOffset)
      .set('focusOffset', 0);

    const newState = EditorState.forceSelection(stateWithContent, newSelection);

    handleChange(newState);
  };

  return (
    <Box>
      <Button
        key={TYPES.EMAIL}
        onMouseDown={openForms}
        sx={{ p: 0.5, minWidth: 3 }}
        size="small"
        disabled={disabled}
      >
        <Mail fontSize="small" />
      </Button>
      <Popover
        open={isOpened}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <EmailPopoverContent onClose={closeForms} addEmail={addEmail} />
      </Popover>
    </Box>
  );
};

EmailModifier.defaultProps = {
  disabled: false,
};

EmailModifier.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setIsInteracted: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default EmailModifier;
