import { STATUS } from '../../components/ImagesUploader/constants';

export const unCroppedWithState = {
  file: new File(['(⌐□_□)'], 'unCropped.png', { type: 'image/png' }),
  status: STATUS.IDLE,
};
export const croppedWithState = {
  file: new File(['(⌐□_□)'], 'cropped.png', { type: 'image/png' }),
  status: STATUS.CROPPED,
};
export const croppingWithState = {
  file: new File(['(⌐□_□)'], 'cropping.png', { type: 'image/png' }),
  status: STATUS.CROPPING,
};

export const croppedFile = new File(['(⌐□_□)'], 'cropped.png', {
  type: 'image/jpeg',
});
export const unCroppedFile = new File(['(⌐□_□)'], 'unCropped.png', {
  type: 'image/jpeg',
});
export const fileWithWrongExtension = new File(['(⌐□_□)'], 'foo.txt', {
  type: 'text/plain',
});
