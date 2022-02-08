import { FormatListBulleted, FormatListNumbered } from '@mui/icons-material';
import { Button, Box } from '@mui/material';
import { RichUtils } from 'draft-js';
import PropTypes from 'prop-types';
import React from 'react';

const BlockModifiers = ({ state, handleChange, disabled }) => {
  const modifiers = [
    {
      command: 'unordered-list-item',
      iconFn: () => <FormatListBulleted fontSize="small" />,
    },
    {
      command: 'ordered-list-item',
      iconFn: () => <FormatListNumbered fontSize="small" />,
    },
  ];

  return (
    <Box sx={{ mr: 1 }}>
      {modifiers.map(({ command, iconFn }) => {
        const onClick = () =>
          handleChange(RichUtils.toggleBlockType(state, command));

        return (
          <Button
            key={command}
            onMouseDown={onClick}
            sx={{ p: 0.5, minWidth: 3, mr: 1 }}
            size="small"
            disabled={disabled}
          >
            {iconFn()}
          </Button>
        );
      })}
    </Box>
  );
};

BlockModifiers.defaultProps = {
  disabled: false,
};

BlockModifiers.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default BlockModifiers;
