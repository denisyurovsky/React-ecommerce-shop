export const IMAGE_SIZE = 100 * 1024;
export const IMAGES_TOTAL_SIZE = 1 * 1024 * 1024;
export const IMAGES_NUMBER = 10;
export const IMAGE_VALIDITY_DEFAULT_STATE = { result: true, message: '' };
export const IMAGE_ERRORS = {
  FILE_TYPE:
    'Invalid image file type. Supported image file types: PNG, BMP, JPEG, JPG, GIF, WEBP.',
  SIZE: 'The image size is too large. Maximum image size is 100Kb.',
  TOTAL_SIZE:
    'The images size is too large. The max files size should not be more than 1024KB.',
  NUMBER:
    'There are too many images. The maximum number of images should be 10pcs.',
};
