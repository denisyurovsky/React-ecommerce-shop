import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { usePermission } from '../../../../hooks/usePermission/usePermission';
import { postNewComment } from '../../../../store/feedback/feedbackSlice';
import { setProductRating } from '../../../../store/products/productsSlice';
import { FetchStatus } from '../../../../ts/enums/enums';
import Modal from '../../../ui-kit/Modal/Modal';

import FeedbackForms from './FeedbackForms/FeedbackForms';

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
    if (postStatus === FetchStatus.Fulfilled) {
      toast.success('Your feedback has been added');
    } else if (postStatus === FetchStatus.Rejected) {
      toast.error(`Feedback haven't been added`);
    }
  }, [postStatus]);

  const open = isOpen && postStatus !== FetchStatus.Fulfilled;

  useEffect(() => {
    if (postStatus === FetchStatus.Fulfilled) {
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
          data-cy="addFeedbackBtn"
        >
          Add new feedback
        </Button>
      )}
      <Modal isOpen={open} onClose={handleClose}>
        <FeedbackForms
          sendForm={sendForm}
          isLoading={postStatus === FetchStatus.Pending}
        />
      </Modal>
    </>
  );
};

FeedbackModal.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default FeedbackModal;
