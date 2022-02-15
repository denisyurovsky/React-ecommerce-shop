import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';

import {
  checkArrayOfImageValidity,
  checkImageFileType,
} from '../../helpers/checkImageValidity/checkImageValidity';
import {
  IMAGE_ERRORS,
  IMAGE_VALIDITY_DEFAULT_STATE,
} from '../../helpers/checkImageValidity/constants/imageValidityConstants';
import { convertImageUrlsToObjects } from '../../helpers/convertImageUrlToObject';
import Spinner from '../ui-kit/Spinner';

import { FilesList } from './FilesList/FilesList';
import { InputFrame } from './InputFrame/InputFrame';

export const ImagesUploader = ({ updateImages, imageUrls }) => {
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
      const filesWithoutWrongType = files.filter((file) =>
        checkImageFileType(file)
      );

      if (files.length !== filesWithoutWrongType.length) {
        toast.error(IMAGE_ERRORS.FILE_TYPE);
      }
      const imagesValidityAfterHandle = checkArrayOfImageValidity(
        filesWithoutWrongType
      );
      const filesWithPreviewURLS = addPreviewURLS(filesWithoutWrongType);

      setDroppedFiles(filesWithPreviewURLS);
      setImagesValidity(imagesValidityAfterHandle);
      updateImages(filesWithoutWrongType, imagesValidityAfterHandle.result);
    },
    [updateImages]
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
    const imageFiles = await convertImageUrlsToObjects(imageUrls);
    const filesWithPreviewURLS = addPreviewURLS(imageFiles);

    setDroppedFiles(filesWithPreviewURLS);
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
  }, [droppedFiles]);

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
};
