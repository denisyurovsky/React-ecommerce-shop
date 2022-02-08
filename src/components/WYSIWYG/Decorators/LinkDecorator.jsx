import PropTypes from 'prop-types';
import React from 'react';

const Link = ({ entityKey, contentState, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      style={{ fontStyle: 'italic' }}
      href={url}
      title={url}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  entityKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  contentState: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default Link;
