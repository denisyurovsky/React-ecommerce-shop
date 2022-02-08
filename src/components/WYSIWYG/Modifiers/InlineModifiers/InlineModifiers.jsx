import {
  FormatItalic,
  FormatBold,
  FormatUnderlined,
} from '@mui/icons-material';
import { Button, Box } from '@mui/material';
import { RichUtils } from 'draft-js';
import PropTypes from 'prop-types';
import React from 'react';

const InlineModifiers = ({ state, handleChange }) => {
  const modifiers = [
    { command: 'BOLD', iconFn: () => <FormatBold fontSize="small" /> },
    { command: 'ITALIC', iconFn: () => <FormatItalic fontSize="small" /> },
    {
      command: 'UNDERLINE',
      iconFn: () => <FormatUnderlined fontSize="small" />,
    },
  ];

  return (
    <Box>
      {modifiers.map(({ command, iconFn }) => {
        const onClick = (e) => {
          e.preventDefault();
          handleChange(RichUtils.toggleInlineStyle(state, command));
        };

        const modes = state.getCurrentInlineStyle();

        return (
          <Button
            key={command}
            onMouseDown={onClick}
            sx={{ p: 0.5, minWidth: 3, mr: 1 }}
            size="small"
            variant={modes.has(command) ? 'contained' : 'text'}
          >
            {iconFn()}
          </Button>
        );
      })}
    </Box>
  );
};

InlineModifiers.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InlineModifiers;
