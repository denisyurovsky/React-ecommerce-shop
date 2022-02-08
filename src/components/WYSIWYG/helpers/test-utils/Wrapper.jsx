import { EditorState } from 'draft-js';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import TextEditor from '../../TextEditor';

const Wrapper = ({ error, helperText }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <TextEditor
      error={error}
      helperText={helperText}
      editorState={editorState}
      setEditorState={setEditorState}
    />
  );
};

Wrapper.defaultProps = {
  error: false,
  helperText: null,
};

Wrapper.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default Wrapper;
