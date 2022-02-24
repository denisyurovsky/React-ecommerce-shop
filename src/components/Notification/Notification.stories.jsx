import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { notificationError } from '../../helpers/constants/constants';

import 'react-toastify/dist/ReactToastify.css';
import styles from './Notification.module.scss';

const toastConfiguration = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  newestOnTop: false,
  rtl: false,
  pauseOnFocusLoss: true,
  theme: 'colored',
};

export function Notification({ status, message }) {
  function onNotification(message) {
    switch (status) {
      case 'success':
        return toast.success(message);
      case 'info':
        return toast.info(message);
      case 'error':
        return toast.error(message || notificationError);
      default:
        return;
    }
  }

  return (
    <div className={styles.container}>
      <Button
        variant={'contained'}
        color={status}
        size="large"
        sx={{ width: 250 }}
        onClick={() => onNotification(message)}
      >
        {status} notification
      </Button>
      {/* ATTENTION!!! You mustn't use ToastContainer in your component */}
      <ToastContainer {...toastConfiguration} />
    </div>
  );
}

export default {
  title: 'Notification',
  component: Notification,
  args: { status: 'error', message: `Done! You've got notification.` },
};

Notification.propTypes = {
  status: PropTypes.oneOf(['success', 'info', 'error']),
  message: PropTypes.string,
};
