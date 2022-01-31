import { ERROR } from './constants/constants';

const checkImageFileType = (file) =>
  /(\.bmp|\.gif|\.jpg|\.jpeg|\.png|\.webp)$/i.test(file.name);

const checkImageSize = (file) => file.size < 102400;

const checkImageValidity = (file) => {
  if (!checkImageFileType(file)) {
    return { result: false, message: ERROR.IMAGE_FILE_TYPE };
  }
  if (!checkImageSize(file)) {
    return { result: false, message: ERROR.IMAGE_SIZE };
  }

  return { result: true, message: '' };
};

export default checkImageValidity;
