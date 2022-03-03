import { TextField, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  MIN_COMMENT_LENGTH,
  DEFAULT_NAME,
} from '../../../../../constants/feedbackConstants.js';
import LoadingButton from '../../../../ui-kit/buttons/LoadingButton.jsx';

import ProductRating from './ProductRating';

const FeedbackForms = ({ sendForm, isLoading }) => {
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);

  const checkForm = (rating, comment) =>
    checkRating(rating) && checkComment(comment);
  const checkRating = (value) => value > 0;
  const checkComment = (text) => text.length >= MIN_COMMENT_LENGTH;

  const handleNameChange = (evt) => setUserName(evt.target.value);
  const handleCommentChange = (evt) => {
    const text = evt.target.value;

    setIsFinished(checkForm(rating, text));
    setComment(text);
  };
  const handleChange = (value) => {
    setIsFinished(checkForm(value, comment));
    setRating(value);
  };

  const prepareToSend = () => {
    const name = userName === '' ? DEFAULT_NAME : userName;

    sendForm({ name, rating, comment });
  };

  return (
    <Box>
      <TextField
        sx={{ mb: 4 }}
        value={userName}
        onChange={handleNameChange}
        autoComplete="off"
        label="Enter your name"
        placeholder={DEFAULT_NAME}
        variant="standard"
        fullWidth
      />
      <ProductRating value={rating} onChange={handleChange} />
      <TextField
        sx={{ mb: 4 }}
        value={comment}
        onChange={handleCommentChange}
        label="Comment"
        placeholder={`Min comment length: ${MIN_COMMENT_LENGTH}`}
        variant="outlined"
        fullWidth
        multiline
        minRows={5}
        maxRows={5}
      />
      {isLoading ? (
        <LoadingButton label="Loading..." isFullWidth={true} />
      ) : (
        <Button
          fullWidth
          variant="contained"
          onClick={prepareToSend}
          disabled={!isFinished}
        >
          Add feedback
        </Button>
      )}
    </Box>
  );
};

FeedbackForms.defaultProps = {
  isLoading: false,
};

FeedbackForms.propTypes = {
  sendForm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default FeedbackForms;
