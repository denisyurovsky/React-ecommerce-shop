import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { MODAL_SIZES } from '../../../../constants/constants';
import Modal from '../Modal';

const { NORMAL, SMALL } = MODAL_SIZES;

const Wrapper = ({
  title,
  actionButtonLabel,
  cancelButtonLabel,
  onConfirm,
  size,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={title}
        actionButtonLabel={actionButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        onConfirm={onConfirm}
        size={size}
      >
        <div>Content</div>
      </Modal>
    </>
  );
};

Wrapper.defaultProps = {
  title: null,
  actionButtonLabel: null,
  cancelButtonLabel: null,
  onConfirm: null,
};

Wrapper.propTypes = {
  title: PropTypes.string,
  actionButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  onConfirm: PropTypes.func,
  size: PropTypes.oneOf([NORMAL, SMALL]),
};

export default Wrapper;
