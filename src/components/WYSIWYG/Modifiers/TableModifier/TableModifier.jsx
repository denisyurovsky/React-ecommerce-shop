import { TableChart } from '@mui/icons-material';
import { Popover, Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { TYPES } from '../../constants';
import { addTable } from '../../helpers/addTableHelper';

import TablePopoverContent from './TablePopoverContent';

const TableModifier = ({
  state,
  setIsInteracted,
  handleChange,
  disabled,
  resetRerender,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tableNumber, setTableNumber] = useState(0);
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

  const insertTable = (numberOfRows) => {
    setTableNumber(tableNumber + 1);
    handleChange(addTable(state, numberOfRows, tableNumber, resetRerender));
  };

  return (
    <Box>
      <Button
        key={TYPES.TABLE}
        onMouseDown={openForms}
        sx={{ p: 0.5, minWidth: 3 }}
        size="small"
        disabled={disabled}
      >
        <TableChart fontSize="small" />
      </Button>
      <Popover
        open={isOpened}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <TablePopoverContent onClose={closeForms} insertTable={insertTable} />
      </Popover>
    </Box>
  );
};

TableModifier.defaultProps = {
  disabled: false,
};

TableModifier.propTypes = {
  state: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  setIsInteracted: PropTypes.func.isRequired,
  resetRerender: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default TableModifier;
