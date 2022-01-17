import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Modal, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { FETCH } from '../../../../helpers/constants/constants';
import { usePermission } from '../../../../hooks/usePermission/usePermission';
import { postNewComment } from '../../../../store/feedback/feedbackSlice';
import { setProductRating } from '../../../../store/products/productsSlice';

import FeedbackForms from './FeedbackForms/FeedbackForms';

import styles from './feedbackModal.module.scss';

const { PENDING, FULFILLED, REJECTED } = FETCH;

const FeedbackModal = ({ productId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const postStatus = useSelector((state) => state.feedback.postStatus);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const sendForm = ({ name, rating, comment }) => {
    const userId = currentUser.id;

    dispatch(postNewComment({ name, rating, comment, productId, userId }));
  };

  useEffect(() => {
    if (postStatus === FULFILLED) {
      toast.success('Your feedback has been added');
    } else if (postStatus === REJECTED) {
      toast.error(`Feedback haven't been added`);
    }
  }, [postStatus]);

  const open = isOpen && postStatus !== FULFILLED;

  useEffect(() => {
    if (postStatus === FULFILLED) {
      dispatch(setProductRating(productId));
    }
  }, [postStatus, productId, dispatch]);

  return (
    <>
      {usePermission() && (
        <Button
          onClick={handleOpen}
          variant="outlined"
          color="primary"
          sx={{ m: '0 auto 20px', display: 'flex', p: 2 }}
          fullWidth
        >
          Add new feedback
        </Button>
      )}
      <Modal open={open} onClose={handleClose} className={styles.container}>
        <Box className={styles.modal}>
          <IconButton
            className={styles.cross}
            color="primary"
            onClick={handleClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
          <FeedbackForms
            sendForm={sendForm}
            isLoading={postStatus === PENDING}
          />
        </Box>
      </Modal>
    </>
  );
};

FeedbackModal.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default FeedbackModal;
