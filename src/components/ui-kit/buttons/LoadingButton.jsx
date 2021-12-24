import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton as HelperButton } from '@mui/lab';
import PropTypes from 'prop-types';
import React from 'react';

const LoadingButton = ({ label, isFullWidth }) => {
  return (
    <HelperButton
      loading
      loadingPosition="start"
      startIcon={<SaveIcon />}
      variant="contained"
      fullWidth={isFullWidth}
    >
      {label}
    </HelperButton>
  );
};

LoadingButton.defaultProps = {
  isFullWidth: false,
};

LoadingButton.propTypes = {
  label: PropTypes.string.isRequired,
  isFullWidth: PropTypes.bool,
};

export default LoadingButton;
