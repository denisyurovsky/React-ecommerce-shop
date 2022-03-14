import { checkImgDimensions } from './checkImgDimensions';

const addCropState = async (imgs) => {
  return Promise.all(
    imgs.map(async (file) => {
      if (await checkImgDimensions(file)) {
        return { file, cropped: true };
      }

      return { file, cropped: false };
    })
  );
};

export const getUnCroppedImgs = async (imgs) => {
  const filesWithState = await addCropState(imgs);

  return filesWithState.filter((img) => !img.cropped).map(({ file }) => file);
};
