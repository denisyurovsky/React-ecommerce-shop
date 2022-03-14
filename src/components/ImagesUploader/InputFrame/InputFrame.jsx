import { Button } from '@mui/material';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import { DEFAULT_MESSAGE } from '../../../constants/imageValidityConstants';

import styles from './InputFrame.module.scss';
const cx = classNames.bind(styles);

export const InputFrame = ({
  handleImageDrop,
  imagesValidity,
  handleImageChange,
}) => {
  const { result: isValid, message } = imagesValidity;
  const imgInput = useRef();
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        if (handleImageDrop) {
          handleImageDrop(item);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [handleImageDrop]
  );
  const isActive = canDrop && isOver;
  const styleInputFrame = cx({
    inputFrame: true,
    active: isActive,
    error: !isValid,
  });

  const handleImageClick = (e) => {
    e.preventDefault();
    imgInput.current.click();
  };

  return (
    <label htmlFor="images-upload">
      <input
        ref={imgInput}
        id="images-upload"
        accept="image/*"
        multiple
        type="file"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <Button
        ref={drop}
        data-testid="imageInput"
        className={styleInputFrame}
        fullWidth
        variant="outlined"
        component="span"
        onClick={handleImageClick}
      >
        {isValid ? DEFAULT_MESSAGE : message}
      </Button>
    </label>
  );
};

InputFrame.propTypes = {
  handleImageDrop: PropTypes.func.isRequired,
  imagesValidity: PropTypes.shape({
    result: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
  handleImageChange: PropTypes.func.isRequired,
};
