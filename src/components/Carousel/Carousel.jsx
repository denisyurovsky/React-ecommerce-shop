import PropTypes from 'prop-types';
import React from 'react';
import ImageGallery from 'react-image-gallery';

import noImg from '../../assets/images/noImg.png';
import { useWindowSize } from '../../hooks/useWindowSize';

import 'react-image-gallery/styles/scss/image-gallery.scss';
import styles from './Carousel.module.scss';

const HEIGHT_IMG = {
  small: '300px',
  large: '400px',
};

const IMG_HEIGHT = (screenWidth, breakPoint) =>
  screenWidth > breakPoint ? HEIGHT_IMG.large : HEIGHT_IMG.small;
const BREAK_POINT = 600;

const prepareGalleryData = (images, screenWidth, breakPoint) =>
  Array.isArray(images) && images.length
    ? images.map((image) => ({
        original: image,
        originalAlt: image,
        thumbnail: image,
        thumbnailAlt: image,
        originalClass: images.length === 1 ? 'single' : 'set',
        originalHeight: IMG_HEIGHT(screenWidth, breakPoint),
      }))
    : [
        {
          original: noImg,
          originalClass: 'single',
          originalHeight: IMG_HEIGHT(screenWidth, breakPoint),
        },
      ];

const Carousel = ({ images }) => {
  const size = useWindowSize();
  const imageUrls = prepareGalleryData(images, size.width, BREAK_POINT);
  const showBullets = imageUrls.length > 1 && size.width > BREAK_POINT;
  const showThumbnails = imageUrls.length > 1;
  const thumbnailPosition = size.width > BREAK_POINT ? 'left' : 'bottom';
  const showNav = size.width > BREAK_POINT;
  const stylesContainer =
    imageUrls.length > 1
      ? styles.container
      : `${styles.container} ${styles.single}`;

  return (
    <div className={stylesContainer} data-testid={thumbnailPosition}>
      <ImageGallery
        items={imageUrls}
        infinite={false}
        showBullets={showBullets}
        showNav={showNav}
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={showThumbnails}
        thumbnailPosition={thumbnailPosition}
      />
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;
