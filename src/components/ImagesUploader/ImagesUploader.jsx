import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';

import {
  IMAGE_ERRORS,
  IMAGE_VALIDITY_DEFAULT_STATE,
} from '../../constants/imageValidityConstants';
import {
  checkArrayOfImageValidity,
  checkImageFileType,
} from '../../helpers/checkImageValidity';
import { convertImageUrlsToObjects } from '../../helpers/convertImageUrlToObject';
import Spinner from '../ui-kit/Spinner/Spinner';

import { LOSS_OF_IMAGES } from './constants';
import { FilesList } from './FilesList/FilesList';
import { InputFrame } from './InputFrame/InputFrame';

export const ImagesUploader = ({ updateImages, imageUrls, disableSubmit }) => {
  const [droppedFiles, setDroppedFiles] = useState([]);
  const [imagesValidity, setImagesValidity] = useState(
    IMAGE_VALIDITY_DEFAULT_STATE
  );
  const [isImagesLoad, setIsImagesLoad] = useState(imageUrls.length);
  const addPreviewURLS = (files) =>
    files.map((file) =>
      Object.assign(file, {
        previewURL: URL.createObjectURL(file),
      })
    );
  const setValues = useCallback(
    (files) => {
      const correctTypeFiles = files.filter((file) => checkImageFileType(file));

      if (files.length !== correctTypeFiles.length) {
        toast.error(IMAGE_ERRORS.FILE_TYPE);
      }

      if (correctTypeFiles.length) {
        disableSubmit();
      }

      const imagesValidityAfterHandle =
        checkArrayOfImageValidity(correctTypeFiles);
      const filesWithPreviewURLS = addPreviewURLS(correctTypeFiles);

      setDroppedFiles(filesWithPreviewURLS);
      setImagesValidity(imagesValidityAfterHandle);
      if (imagesValidityAfterHandle.result) {
        updateImages(correctTypeFiles);
      }
    },
    [updateImages, disableSubmit]
  );
  const handleFileDrop = useCallback(
    (item) => {
      if (!item) {
        return;
      }
      const files = [...droppedFiles, ...item.files];

      setValues(files);
    },
    [droppedFiles, setValues]
  );
  const convertImages = useCallback(async (imageUrls) => {
    try {
      const imageFiles = await convertImageUrlsToObjects(imageUrls);
      const filesWithPreviewURLS = addPreviewURLS(imageFiles);

      setDroppedFiles(filesWithPreviewURLS);
    } catch (err) {
      toast.error(LOSS_OF_IMAGES);
      updateImages([]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (imageUrls.length) {
      convertImages(imageUrls);
      setIsImagesLoad(false);
    }
  }, [imageUrls, convertImages]);

  useEffect(() => {
    const removeURLS = () => {
      droppedFiles.forEach((file) => URL.revokeObjectURL(file.previewURL));
    };

    return removeURLS();
    // eslint-disable-next-line
  }, []);

  const handleFileDelete = (currentIndex) => {
    const files = droppedFiles.filter((item, index) => index !== currentIndex);

    setValues(files);
  };

  const handleFilesChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const files = [...droppedFiles, ...newFiles];

    event.target.value = '';
    setValues(files);
  };

  return (
    <Box>
      <DndProvider backend={HTML5Backend}>
        <InputFrame
          handleImageDrop={handleFileDrop}
          handleImageChange={handleFilesChange}
          imagesValidity={imagesValidity}
        />
        {isImagesLoad ? (
          <Spinner />
        ) : (
          <FilesList
            filesList={droppedFiles}
            handleImageDelete={handleFileDelete}
          />
        )}
      </DndProvider>
    </Box>
  );
};

ImagesUploader.propTypes = {
  updateImages: PropTypes.func.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  disableSubmit: PropTypes.func.isRequired,
};
