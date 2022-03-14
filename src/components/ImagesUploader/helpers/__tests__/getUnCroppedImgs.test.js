import {
  croppedFile,
  unCroppedFile,
} from '../../../../test-utils/images/images';

jest.mock('../checkImgDimensions', () => {
  return {
    __esModule: true,
    checkImgDimensions: async (file) => file.name.includes('cropped.'),
  };
});

const { getUnCroppedImgs } = jest.requireActual('../getUnCroppedImgs.js');

describe('basic functionality', () => {
  it('should return 2 images', async () => {
    const imgsArray = [croppedFile, croppedFile, unCroppedFile, unCroppedFile];
    const result = await getUnCroppedImgs(imgsArray);

    expect(result).toHaveLength(2);
    result.forEach((el) => {
      expect(el.name).toBe(unCroppedFile.name);
    });
  });

  it('should return empty array', async () => {
    const imgsArray = [croppedFile, croppedFile];
    const result = await getUnCroppedImgs(imgsArray);

    expect(result).toHaveLength(0);
  });
});
