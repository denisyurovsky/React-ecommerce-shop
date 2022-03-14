import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';

import {
  IMAGE_ERRORS,
  IMAGE_VALIDITY_DEFAULT_STATE,
  UPLOADER_READY_STATE,
  UPLOADER_PENDING_STATE,
} from '../../constants/imageValidityConstants';
import {
  checkArrayOfImageValidity,
  checkImageFileType,
} from '../../helpers/checkImageValidity';
import { convertImageUrlsToObjects } from '../../helpers/convertImageUrlToObject';
import guid from '../../helpers/guid';

import { LOSS_OF_IMAGES, STATUS } from './constants';
import { FilesList } from './FilesList/FilesList';
import addPreviewURL from './helpers/addPreviewURL';
import checkSameFiles from './helpers/checkSameFiles';
import { getUnCroppedImgs } from './helpers/getUnCroppedImgs';
import ImageCrop from './ImageCrop/ImageCrop';
import { InputFrame } from './InputFrame/InputFrame';

export const ImagesUploader = ({ updateImages, imageUrls, disableSubmit }) => {
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [unCroppedFiles, setUnCroppedFiles] = useState([]);
  const [imageForCrop, setImageForCrop] = useState();
  const [imagesValidity, setImagesValidity] = useState(
    IMAGE_VALIDITY_DEFAULT_STATE
  );
  const [isImagesLoad, setIsImagesLoad] = useState(Boolean(imageUrls.length));

  const addIdentifier = (...files) =>
    files.filter((file) => !file.id).map((file) => (file.id = guid()));

  const setValues = (files) => {
    setImagesValidity(UPLOADER_PENDING_STATE);

    const correctTypeFiles = files.filter((file) => checkImageFileType(file));

    if (files.length !== correctTypeFiles.length) {
      toast.error(IMAGE_ERRORS.FILE_TYPE);
    }

    if (correctTypeFiles.length) {
      disableSubmit();
    }

    addPreviewURL(...correctTypeFiles);
    addIdentifier(...correctTypeFiles);
    setDroppedFiles([...droppedFiles, ...correctTypeFiles]);
  };

  const checkCurrentState = (state) => imagesValidity.message === state.message;

  const resetImagesState = () => {
    if (!checkCurrentState(IMAGE_VALIDITY_DEFAULT_STATE)) {
      updateImages([]);
    }

    setImagesValidity(IMAGE_VALIDITY_DEFAULT_STATE);
    setUnCroppedFiles([]);
    setImageForCrop(null);
  };

  useEffect(() => {
    const handleImgsValidity = async () => {
      if (!droppedFiles.length) {
        return resetImagesState();
      }

      const unCroppedImages = await getUnCroppedImgs(droppedFiles);
      const imageForCrop = unCroppedImages.length
        ? unCroppedImages[unCroppedImages.length - 1]
        : null;

      let validityState = checkArrayOfImageValidity(droppedFiles);

      if (!imageForCrop && validityState.result) {
        validityState = UPLOADER_READY_STATE;
      }

      setImagesValidity(validityState);
      setUnCroppedFiles(unCroppedImages);
      setImageForCrop(imageForCrop);
    };

    handleImgsValidity();
  }, [droppedFiles]); // eslint-disable-line

  useEffect(() => {
    const convertImages = async (imageUrls) => {
      try {
        const imageFiles = await convertImageUrlsToObjects(imageUrls);

        setValues(imageFiles);
        setIsImagesLoad(false);
      } catch (err) {
        toast.error(LOSS_OF_IMAGES);
        updateImages([]);
      }
    };

    if (imageUrls.length) {
      convertImages(imageUrls);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    return () => {
      droppedFiles.forEach((file) => URL.revokeObjectURL(file.previewURL));
    };
  }, []); // eslint-disable-line

  const handleFileDrop = (item) => {
    if (!item) return;

    setValues(item.files);
  };

  const getFileAfterCrop = (croppedFile) => {
    addPreviewURL(croppedFile);
    setDroppedFiles(
      droppedFiles.map((el) =>
        checkSameFiles(el, croppedFile) ? croppedFile : el
      )
    );
  };

  const handleFileDelete = (currentIndex) =>
    setDroppedFiles(
      droppedFiles.filter((item, index) => index !== currentIndex)
    );

  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);

    e.target.value = '';
    setValues(newFiles);
  };

  const resetCroppedImage = () => setImageForCrop(null);

  const displayedFiles = droppedFiles.map((file) => {
    if (imageForCrop && checkSameFiles(file, imageForCrop)) {
      return { file, status: STATUS.CROPPING };
    }

    const isCropped = !unCroppedFiles.filter((el) => checkSameFiles(file, el))
      .length;
    const status = isCropped ? STATUS.CROPPED : STATUS.IDLE;

    return { file, status };
  });

  useEffect(() => {
    if (checkCurrentState(UPLOADER_READY_STATE)) {
      updateImages(droppedFiles);
    }
  }, [imagesValidity, droppedFiles]); // eslint-disable-line

  const checkCorrectFormat = () =>
    imagesValidity.message !== IMAGE_ERRORS.FILE_TYPE;

  const isCropNeeded = checkCorrectFormat() && Boolean(imageForCrop);

  return (
    <Box>
      <DndProvider backend={HTML5Backend}>
        <InputFrame
          handleImageDrop={handleFileDrop}
          handleImageChange={handleFilesChange}
          imagesValidity={imagesValidity}
        />
        {isCropNeeded && (
          <ImageCrop
            imgFile={imageForCrop}
            passFile={getFileAfterCrop}
            resetCroppedImage={resetCroppedImage}
          />
        )}
        <FilesList
          setCroppedImage={setImageForCrop}
          filesList={displayedFiles}
          handleImageDelete={handleFileDelete}
          isImagesLoad={isImagesLoad}
        />
      </DndProvider>
    </Box>
  );
};

ImagesUploader.propTypes = {
  updateImages: PropTypes.func.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  disableSubmit: PropTypes.func.isRequired,
};
