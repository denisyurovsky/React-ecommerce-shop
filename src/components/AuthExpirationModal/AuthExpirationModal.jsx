import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import ModalMui from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './AuthExpirationModal.module.scss';

const Modal = ({ handleClose, isOpenModal }) => (
  <ModalMui
    open={isOpenModal}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className={styles.box}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Attention.
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        The session has expired. Please login again.
      </Typography>
      <IconButton
        data-testid="btn-close-modal"
        className={styles.cross}
        color="primary"
        onClick={handleClose}
        size="small"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  </ModalMui>
);

Modal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Modal;
