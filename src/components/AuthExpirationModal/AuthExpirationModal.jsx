import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import ModalWindow from '../ui-kit/Modal/Modal';

const Modal = ({ handleClose, isOpenModal }) => (
  <ModalWindow
    isOpen={isOpenModal}
    onClose={handleClose}
    title="Attention."
    size="small"
  >
    <Typography id="modal-modal-description">
      The session has expired. Please login again.
    </Typography>
  </ModalWindow>
);

Modal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Modal;
