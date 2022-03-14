import PropTypes from 'prop-types';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { FilesList } from '../FilesList';

const Wrapper = ({ isLoad, files, setCroppedImage, handleDelete }) => (
  <DndProvider backend={HTML5Backend}>
    <FilesList
      handleImageDelete={handleDelete}
      filesList={files}
      setCroppedImage={setCroppedImage}
      isImagesLoad={isLoad}
    />
  </DndProvider>
);

Wrapper.defaultProps = {
  isLoad: false,
  files: [],
  setCroppedImage: () => {},
  handleDelete: () => {},
};

Wrapper.propTypes = {
  isLoad: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.object),
  setCroppedImage: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default Wrapper;
