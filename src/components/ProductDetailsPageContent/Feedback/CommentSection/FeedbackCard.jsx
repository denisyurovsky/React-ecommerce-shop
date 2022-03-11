import { KeyboardArrowUp } from '@mui/icons-material';
import { Card, CardContent, Rating, Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  DEFAULT_NAME,
  MAX_SHOWN_SYMBOLS,
} from '../../../../constants/feedbackConstants';
import { pathNames } from '../../../../constants/pathNames';
import { formatDate } from '../../../../helpers/formatData';
import Link from '../../../ui-kit/Link/Link';

import styles from './feedbackCard.module.scss';

const FeedbackCard = ({ review }) => {
  const {
    comment,
    createdAt,
    rating,
    userId,
    productId,
    productName,
    displayedName,
  } = review;
  const { pathname, state } = useLocation();
  const [isTextFullyVisible, setIsTextFullyVisible] = useState(false);
  const onClick = () => setIsTextFullyVisible(!isTextFullyVisible);

  const { linkTitle, url } = pathname.includes('products')
    ? { linkTitle: displayedName, url: `${pathNames.USERS}/${userId}` }
    : { linkTitle: productName, url: `${pathNames.PRODUCTS}/${productId}` };

  const date = formatDate(createdAt);
  const title = `${linkTitle} (${date})`;
  const isLong = comment.length > MAX_SHOWN_SYMBOLS;
  const isLimited = isLong && !isTextFullyVisible;
  const content = isLimited
    ? `${comment.slice(0, MAX_SHOWN_SYMBOLS)}...`
    : comment;

  useEffect(() => {
    const currentFeedback = document.getElementById(
      `feedback${state?.feedbackId}`
    );

    if (currentFeedback) {
      currentFeedback.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [state?.feedbackId]);

  return (
    <Card sx={{ mb: 3 }} id={`feedback${review.id}`}>
      <CardContent className={styles.comment}>
        <Typography variant="h5" className={styles.title}>
          {displayedName === DEFAULT_NAME ? (
            title
          ) : (
            <Link
              to={url}
              state={{ feedbackId: review.id }}
              style={{ display: 'inline' }}
            >
              {title}
            </Link>
          )}
        </Typography>
        <Rating sx={{ mb: 4 }} value={rating} readOnly size="small" />
        <Typography variant="body2">
          {content}
          {isLong && (
            <Button
              data-testid="toggleVisibility"
              size="small"
              onClick={onClick}
              className={`${styles.btn} ${
                isTextFullyVisible ? styles.bottom : ''
              }`}
            >
              {isTextFullyVisible ? <KeyboardArrowUp /> : 'Read more'}
            </Button>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

FeedbackCard.propTypes = {
  review: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    displayedName: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    productId: PropTypes.number.isRequired,
  }),
};

export default FeedbackCard;
