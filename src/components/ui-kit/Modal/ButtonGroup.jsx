import { Button, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Modal.module.scss';

const ButtonGroup = ({
  cancelButtonLabel,
  actionButtonLabel,
  onClose,
  onConfirm,
  isActionButtonDisabled,
}) => {
  if (!cancelButtonLabel) {
    return (
      <Button
        sx={{ mt: 3 }}
        variant="contained"
        color="primary"
        onClick={onConfirm}
        fullWidth
        disabled={isActionButtonDisabled}
      >
        {actionButtonLabel}
      </Button>
    );
  }

  return (
    <Box className={styles.modalButtons}>
      <Button
        variant="outlined"
        color="primary"
        onClick={onClose}
        sx={{ mr: 2, flexGrow: 1 }}
      >
        {cancelButtonLabel}
      </Button>
      <Button
        sx={{ flexGrow: 1 }}
        variant="contained"
        color="primary"
        onClick={onConfirm}
        disabled={isActionButtonDisabled}
      >
        {actionButtonLabel}
      </Button>
    </Box>
  );
};

ButtonGroup.defaultProps = {
  cancelButtonLabel: null,
  onClose: null,
  isActionButtonDisabled: false,
};

ButtonGroup.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  actionButtonLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
    .isRequired,
  cancelButtonLabel: PropTypes.string,
  onClose: PropTypes.func,
  isActionButtonDisabled: PropTypes.bool,
};

export default ButtonGroup;
