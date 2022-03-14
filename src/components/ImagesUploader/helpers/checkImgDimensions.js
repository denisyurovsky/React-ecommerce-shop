import {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from '../../../constants/imageValidityConstants';

const checkDimensions = (width, height) =>
  width === IMAGE_WIDTH && height === IMAGE_HEIGHT;

const getImageDimensions = (imgFile) => {
  return new Promise((res) => {
    const img = new Image();

    img.addEventListener('load', () => {
      res({
        width: img.width,
        height: img.height,
        img,
      });
    });

    img.src = URL.createObjectURL(imgFile);
  });
};

export const checkImgDimensions = async (imgFile) => {
  const { width, height, img } = await getImageDimensions(imgFile);

  URL.revokeObjectURL(img.src);

  return checkDimensions(width, height);
};
