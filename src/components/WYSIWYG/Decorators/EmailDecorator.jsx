import PropTypes from 'prop-types';
import React from 'react';

const Email = ({ entityKey, contentState, children }) => {
  const { address } = contentState.getEntity(entityKey).getData();

  return (
    <a
      style={{ textDecoration: 'none' }}
      href={`mailto:${address}`}
      title={address}
    >
      {children}
    </a>
  );
};

Email.propTypes = {
  entityKey: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  contentState: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default Email;
