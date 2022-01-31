import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import Empty from '../../../ui-kit/Empty';

import FeedbackCard from './FeedbackCard';

const CommentSection = ({ comments, message }) => (
  <Box data-testid="comments">
    {comments.length === 0 ? (
      <Empty message={message} />
    ) : (
      comments.map((review) => <FeedbackCard key={review.id} review={review} />)
    )}
  </Box>
);

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
};

export default CommentSection;
