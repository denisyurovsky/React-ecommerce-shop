import { Box, StepConnector, CircularProgress, Container } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { EMPTY, ERROR } from '../../../constants/constants';
import {
  fetchCommentsByProductId,
  selectAllComments,
  clearFeedbacks,
} from '../../../store/feedback/feedbackSlice';
import { FetchStatus } from '../../../ts/enums/enums';

import CommentSection from './CommentSection/CommentSection';
import FeedbackModal from './FeedbackModal/FeedbackModal';

const Feedback = ({ productId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectAllComments);
  const status = useSelector((state) => state.feedback.status);
  const isLoading = status === FetchStatus.Pending;

  useEffect(() => {
    dispatch(fetchCommentsByProductId(productId));

    return () => dispatch(clearFeedbacks());
  }, [productId, dispatch]);

  useEffect(() => {
    if (status === FetchStatus.Rejected) {
      toast.error(ERROR.LOAD_FEEDBACK);
    }
  }, [status]);

  return (
    <Box sx={{ pt: 4, mb: 2 }} data-testid="feedback-section">
      <FeedbackModal productId={productId} />
      <StepConnector sx={{ mb: 2 }} />
      {isLoading ? (
        <Container sx={{ justifyContent: 'center', display: 'flex' }}>
          <CircularProgress sx={{ textAlign: 'center' }} />
        </Container>
      ) : (
        <CommentSection
          comments={comments}
          message={EMPTY.NO_COMMENTS_BE_THE_FIRST}
        />
      )}
    </Box>
  );
};

Feedback.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Feedback;
