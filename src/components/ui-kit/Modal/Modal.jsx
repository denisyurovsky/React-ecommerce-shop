import CloseIcon from '@mui/icons-material/Close';
import { Modal as ModalMui, Box, IconButton, Typography } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { MODAL_SIZES } from '../../../constants/constants';

import ButtonGroup from './ButtonGroup';

import styles from './Modal.module.scss';

const { NORMAL, SMALL } = MODAL_SIZES;

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  cancelButtonLabel,
  actionButtonLabel,
  isActionButtonDisabled,
  size,
}) => {
  const withButtons = Boolean(actionButtonLabel) && Boolean(onConfirm);
  const isSmall = size === SMALL;
  const isBigWithTitle = title && !isSmall;

  return (
    <ModalMui open={isOpen} className={styles.container} onClose={onClose}>
      <Box
        className={classNames({
          [styles.modal]: true,
          [styles.modalWithLabel]: isBigWithTitle,
          [styles.modalSmall]: isSmall,
        })}
      >
        {title && (
          <Typography
            variant={isSmall ? 'h5' : 'h4'}
            component="h2"
            className={classNames({
              [styles.title]: !isSmall,
              [styles.titleCenter]: isSmall,
            })}
          >
            {title}
          </Typography>
        )}
        <IconButton
          className={classNames({
            [styles.cross]: true,
            [styles.crossWithLabel]: isBigWithTitle,
          })}
          color="primary"
          onClick={onClose}
          size="small"
        >
          <CloseIcon />
        </IconButton>
        {children}
        {withButtons && (
          <ButtonGroup
            cancelButtonLabel={cancelButtonLabel}
            actionButtonLabel={actionButtonLabel}
            onClose={onClose}
            onConfirm={onConfirm}
            isActionButtonDisabled={isActionButtonDisabled}
          />
        )}
      </Box>
    </ModalMui>
  );
};

Modal.defaultProps = {
  title: null,
  onConfirm: null,
  actionButtonLabel: null,
  cancelButtonLabel: null,
  size: NORMAL,
  isActionButtonDisabled: false,
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  actionButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  size: PropTypes.oneOf([NORMAL, SMALL]),
  isActionButtonDisabled: PropTypes.bool,
};

export default Modal;
