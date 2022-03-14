import '@testing-library/jest-dom';
import { createBrowserHistory } from 'history';

jest.setTimeout(20000);
jest.mock('draft-js/lib/generateRandomKey', () => () => '123');
window.URL.createObjectURL = () => 'http://someURL';
window.URL.revokeObjectURL = () => {};

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

jest.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => (address) => {
    createBrowserHistory().push(address);
  },
}));

jest.mock('./components/ImagesUploader/helpers/getUnCroppedImgs', () => {
  return {
    __esModule: true,
    getUnCroppedImgs: async (files) =>
      files.filter((file) => !file.name.includes('cropped.')),
  };
});

jest.doMock('./components/ImagesUploader/helpers/getCroppedImg', () => {
  return {
    __esModule: true,
    default: async (image, cropper, fileName, id) => {
      const file = new File(['img'], fileName.replace('.', '.cropped.'));

      file.id = id;

      return file;
    },
  };
});
