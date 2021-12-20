import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import React from 'react';

const CustomLoadingButton = ({ label, isFullWidth }) => {
  return (
    <LoadingButton
      loading
      loadingPosition="start"
      startIcon={<SaveIcon />}
      variant="contained"
      fullWidth={isFullWidth}
    >
      {label}
    </LoadingButton>
  );
};

CustomLoadingButton.defaultProps = {
  isFullWidth: false,
};

CustomLoadingButton.propTypes = {
  label: PropTypes.string.isRequired,
  isFullWidth: PropTypes.bool,
};

export default CustomLoadingButton;
