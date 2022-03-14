import {
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from '../../../constants/imageValidityConstants';

const getImageCanvasData = (cropper) => {
  const image = cropper.getCanvasData();
  const crop = cropper.getCropBoxData();

  const left = crop.left > image.left ? crop.left - image.left : 0;
  const top = crop.top > image.top ? crop.top - image.top : 0;
  const blackLineWidth = Math.max(image.left - crop.left, 0);
  const blackLineHeight = Math.max(image.top - crop.top, 0);

  let width, height;

  if (crop.left > image.left) {
    width = image.width - left > crop.width ? crop.width : image.width - left;
    height =
      image.height - top > crop.height ? crop.height : image.height - top;
  } else {
    width =
      image.width > crop.width - blackLineWidth
        ? image.width
        : crop.width - blackLineWidth;
    height =
      image.height > crop.height - blackLineHeight
        ? image.height
        : crop.height - blackLineHeight;
  }

  const imgScaleX = image.naturalWidth / image.width;
  const imgScaleY = image.naturalHeight / image.height;
  const boxScaleX = IMAGE_WIDTH / crop.width;
  const boxScaleY = IMAGE_HEIGHT / crop.height;

  return [
    left * imgScaleX,
    top * imgScaleY,
    width * imgScaleX,
    height * imgScaleY,
    blackLineWidth * boxScaleX,
    blackLineHeight * boxScaleY,
    width * boxScaleX,
    height * boxScaleY,
  ];
};

const drawImageOnCanvas = (image, cropper) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = IMAGE_WIDTH;
  canvas.height = IMAGE_HEIGHT;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(image, ...getImageCanvasData(cropper));

  return canvas;
};

const getCroppedImg = (image, cropper, fileName, id) => {
  const canvas = drawImageOnCanvas(image, cropper);

  return new Promise((res) => {
    canvas.toBlob(
      (blob) => {
        blob.name = fileName;
        blob.id = id;
        res(blob);
      },
      'image/jpeg',
      1
    );
  });
};

export default getCroppedImg;
