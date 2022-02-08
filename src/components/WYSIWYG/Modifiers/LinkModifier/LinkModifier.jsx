import { AddLink } from '@mui/icons-material';
import { Popover, Button, Box } from '@mui/material';
import { EditorState, Modifier } from 'draft-js';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { TYPES } from '../../constants';
import createDecorator from '../../Decorators/Decorators';

import LinkPopoverContent from './LinkPopoverContent';

const LinkModifier = ({ state, handleChange, setIsInteracted, disabled }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpened = Boolean(anchorEl);

  const openForms = (e) => {
    e.preventDefault();
    setIsInteracted(true);
    setAnchorEl(e.currentTarget);
  };
  const closeForms = () => {
    setIsInteracted(false);
    setAnchorEl(null);
  };

  const addLink = (text, link) => {
    const currentContent = state.getCurrentContent();
    const contentStateWithEntity = currentContent.createEntity(
      TYPES.LINK,
      'MUTABLE',
      {
        url: link,
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const textWithEntity = Modifier.replaceText(
      currentContent,
      state.getSelection(),
      text,
      null,
      entityKey
    );

    const stateWithContent = EditorState.createWithContent(
      textWithEntity,
      createDecorator()
    );

    const startSelection = state.getSelection();
    const startOffset = startSelection.getStartOffset();
    const endOffset = startOffset + text.length;
    const newSelection = startSelection
      .set('anchorOffset', endOffset)
      .set('focusOffset', 0);

    const newState = EditorState.forceSelection(stateWithContent, newSelection);

    handleChange(newState);
  };

  return (
    <Box>
      <Button
        key={TYPES.LINK}
        onMouseDown={openForms}
        sx={{ p: 0.5, minWidth: 3 }}
        size="small"
        disabled={disabled}
      >
        <AddLink fontSize="small" />
      </Button>
      <Popover
        open={isOpened}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <LinkPopoverContent onClose={closeForms} addLink={addLink} />
      </Popover>
    </Box>
  );
};

LinkModifier.defaultProps = {
  disabled: false,
};

LinkModifier.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setIsInteracted: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default LinkModifier;
