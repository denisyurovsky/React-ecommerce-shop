import { Button, Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Cropper } from 'react-cropper';

import {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from '../../../constants/imageValidityConstants';
import getCroppedImg from '../helpers/getCroppedImg';

import styles from './ImageCrop.module.scss';

const ImageCrop = ({
  imgFile,
  passFile,
  resetCroppedImage,
  imageHeight,
  imageWidth,
}) => {
  const cropperRef = useRef();

  const generateBlob = async () => {
    const cropper = cropperRef.current.cropper;
    const croppedFile = await getCroppedImg(
      cropperRef.current,
      cropper,
      imgFile.name,
      imgFile.id
    );

    passFile(croppedFile);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper} data-testid="cropper">
        <Cropper
          style={{ width: '100%', height: '100%' }}
          src={imgFile.previewURL}
          alt={imgFile.name}
          aspectRatio={imageHeight / imageWidth}
          dragMode="move"
          minCropBoxWidth={imageWidth}
          minCropBoxHeight={imageHeight}
          cropBoxResizable={false}
          guides={false}
          ref={cropperRef}
        />
      </Box>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={resetCroppedImage}>
          Cancel
        </Button>
        <Button variant="contained" onClick={generateBlob}>
          Crop
        </Button>
      </Stack>
    </Box>
  );
};

ImageCrop.defaultProps = {
  forceCrop: false,
  imageHeight: IMAGE_HEIGHT,
  imageWidth: IMAGE_WIDTH,
};

ImageCrop.propTypes = {
  passFile: PropTypes.func.isRequired,
  imgFile: PropTypes.object.isRequired,
  resetCroppedImage: PropTypes.func.isRequired,
  imageHeight: PropTypes.number,
  imageWidth: PropTypes.number,
};

export default ImageCrop;
