import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './ProfileEditButton.module.scss';

const ProfileEditButtons = ({
  disabled,
  handleEdition,
  cancelEdition,
  setDisabled,
}) =>
  disabled ? (
    <Button variant="outlined" size="large" onClick={() => setDisabled(false)}>
      Edit Profile
    </Button>
  ) : (
    <div>
      <Button
        variant="outlined"
        size="large"
        className={styles.editButton}
        onClick={handleEdition}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        size="large"
        color="error"
        className={styles.editButton}
        onClick={cancelEdition}
      >
        Cancel
      </Button>
    </div>
  );

ProfileEditButtons.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleEdition: PropTypes.func.isRequired,
  cancelEdition: PropTypes.func.isRequired,
  setDisabled: PropTypes.func.isRequired,
};

export default ProfileEditButtons;
