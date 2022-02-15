import {
  IMAGES_NUMBER,
  IMAGES_TOTAL_SIZE,
  IMAGE_ERRORS,
  IMAGE_SIZE,
  IMAGE_VALIDITY_DEFAULT_STATE,
} from './constants/imageValidityConstants';

const checkImageFileType = (file) =>
  /(\.bmp|\.gif|\.jpg|\.jpeg|\.png|\.webp)$/i.test(file.name);

const checkImageSize = (file) => file.size < IMAGE_SIZE;

const checkImageValidity = (file) => {
  if (!checkImageFileType(file)) {
    return { result: false, message: IMAGE_ERRORS.FILE_TYPE };
  }
  if (!checkImageSize(file)) {
    return { result: false, message: IMAGE_ERRORS.SIZE };
  }

  return IMAGE_VALIDITY_DEFAULT_STATE;
};

export default checkImageValidity;

const checkArrayOfImageValidity = (files) => {
  if (files.length > IMAGES_NUMBER) {
    return { result: false, message: IMAGE_ERRORS.NUMBER };
  }
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  if (totalSize > IMAGES_TOTAL_SIZE) {
    return { result: false, message: IMAGE_ERRORS.TOTAL_SIZE };
  }

  return IMAGE_VALIDITY_DEFAULT_STATE;
};

export { checkArrayOfImageValidity, checkImageFileType };
