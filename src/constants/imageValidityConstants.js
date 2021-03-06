export const IMAGE_SIZE = 1 * 1024 * 1024;
export const IMAGES_NUMBER = 10;
export const IMAGES_TOTAL_SIZE = IMAGES_NUMBER * IMAGE_SIZE;
export const IMAGE_VALIDITY_DEFAULT_STATE = { result: true, message: '' };

export const UPLOADER_READY_STATE = { result: true, message: 'done' };
export const UPLOADER_PENDING_STATE = { result: true, message: 'pending' };

export const CROPPED = 'done';
export const DEFAULT_MESSAGE = 'Choose images to upload';

export const IMAGE_ERRORS = {
  FILE_TYPE:
    'Invalid image file type. Supported image file types: PNG, BMP, JPEG, JPG, GIF, WEBP.',
  SIZE: 'The image size is too large. Maximum image size is 1MB.',
  TOTAL_SIZE:
    'The images size is too large. The max files size should not be more than 10MB.',
  NUMBER:
    'There are too many images. The maximum number of images should be 10pcs.',
};

export const IMAGE_WIDTH = 1000;
export const IMAGE_HEIGHT = 1000;
