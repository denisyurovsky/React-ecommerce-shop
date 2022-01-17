import MoodIcon from '@mui/icons-material/Mood';
import { Typography, Container, Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import FeedbackCard from './FeedbackCard';

const CommentSection = ({ comments }) => {
  const isEmpty = comments.length === 0;

  return (
    <Box data-testid="comments">
      {isEmpty ? (
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="subtitle1">
            There are no comments yet. Be the first to review
          </Typography>
          <MoodIcon sx={{ ml: 1 }} color="primary" />
        </Container>
      ) : (
        comments.map((review) => (
          <FeedbackCard key={review.id} review={review} />
        ))
      )}
    </Box>
  );
};

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentSection;
