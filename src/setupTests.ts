import '@testing-library/jest-dom';
import { createBrowserHistory } from 'history';

jest.setTimeout(20000);
jest.mock('draft-js/lib/generateRandomKey', () => () => '123');
window.URL.createObjectURL = () => 'http://someURL';
window.URL.revokeObjectURL = jest.fn();

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

jest.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => (address: string) => {
    createBrowserHistory().push(address);
  },
}));

interface File {
  id: number;
  name: string;
}

jest.mock('./components/ImagesUploader/helpers/getUnCroppedImgs', () => {
  return {
    __esModule: true,
    getUnCroppedImgs: async (files: File[]) =>
      files.filter((file: File) => !file.name.includes('cropped.')),
  };
});

jest.doMock('./components/ImagesUploader/helpers/getCroppedImg', () => {
  return {
    __esModule: true,
    default: async (
      image: object,
      cropper: object,
      fileName: string,
      id: number
    ) => {
      const file: { [k: string]: any } = new File(
        ['img'],
        fileName.replace('.', '.cropped.')
      );

      file.id = id;

      return file;
    },
  };
});
