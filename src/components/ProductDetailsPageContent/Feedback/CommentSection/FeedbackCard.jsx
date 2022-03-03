import { KeyboardArrowUp } from '@mui/icons-material';
import { Card, CardContent, Rating, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { MAX_SHOWN_SYMBOLS } from '../../../../constants/feedbackConstants';
import { formatDate } from '../../../../helpers/formatData';

import styles from './feedbackCard.module.scss';

const FeedbackCard = ({ review }) => {
  const { comment, createdAt, rating, displayedName } = review;
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen(!isOpen);

  const date = formatDate(createdAt);
  const isLong = comment.length > MAX_SHOWN_SYMBOLS;
  const isLimited = isLong && !isOpen;
  const content = isLimited
    ? `${comment.slice(0, MAX_SHOWN_SYMBOLS)}...`
    : comment;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent className={styles.comment}>
        <Typography variant="h5" sx={{ mb: 2, ml: 1, mt: 1 }}>
          {displayedName} ({date})
        </Typography>
        <Rating sx={{ mb: 4, ml: 1 }} value={rating} readOnly size="small" />
        {isLong ? (
          <Typography variant="body2">
            {content}
            <Button
              data-testid="toggleVisibility"
              size="small"
              onClick={onClick}
              className={`${styles.btn} ${isOpen ? styles.bottom : ''}`}
            >
              {isOpen ? <KeyboardArrowUp /> : 'Read more'}
            </Button>
          </Typography>
        ) : (
          <Typography variant="body2">{content}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

FeedbackCard.propTypes = {
  review: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    displayedName: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
  }),
};

export default FeedbackCard;
