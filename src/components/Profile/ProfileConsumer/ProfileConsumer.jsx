import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { EMPTY, ERROR } from '../../../constants/constants';
import {
  clearFeedbacks,
  fetchCommentsByUserId,
  getFeedbackStatus,
  selectAllComments,
} from '../../../store/feedback/feedbackSlice';
import { FetchStatus } from '../../../ts/enums/enums';
import CommentSection from '../../ProductDetailsPageContent/Feedback/CommentSection/CommentSection';
import Spinner from '../../ui-kit/Spinner/Spinner';

function ProfileConsumer({ profileId }) {
  const dispatch = useDispatch();
  const comments = useSelector(selectAllComments);
  const status = useSelector(getFeedbackStatus);

  const isLoading = status === FetchStatus.Pending;

  useEffect(() => {
    dispatch(fetchCommentsByUserId(profileId));

    return () => dispatch(clearFeedbacks());
  }, [profileId, dispatch]);

  useEffect(() => {
    if (status === FetchStatus.Rejected) {
      toast.error(ERROR.LOAD_FEEDBACK);
    }
  }, [status]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <CommentSection comments={comments} message={EMPTY.NO_COMMENTS_FROM_USER} />
  );
}

ProfileConsumer.propTypes = {
  profileId: PropTypes.number.isRequired,
};

export default ProfileConsumer;
