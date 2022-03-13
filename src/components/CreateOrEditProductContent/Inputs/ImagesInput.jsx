import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { convertBase64ArrayOfImages } from '../../../helpers/convertBase64';
import { ImagesUploader } from '../../ImagesUploader/ImagesUploader';

const ImagesInput = ({ value, onChange, disableSubmit }) => {
  const [imageURLS] = useState(value);

  const updateImages = async (files) => {
    const convertedFiles = await convertBase64ArrayOfImages(files);

    onChange(convertedFiles);
  };

  return (
    <ImagesUploader
      updateImages={updateImages}
      imageUrls={imageURLS}
      disableSubmit={disableSubmit}
    />
  );
};

ImagesInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  disableSubmit: PropTypes.func.isRequired,
};

export default ImagesInput;
