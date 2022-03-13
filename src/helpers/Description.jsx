import { Editor } from 'draft-js';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

import { blockRenderHelper } from '../components/WYSIWYG/helpers/blockRenderHelper';

const Description = ({ editorState }) => {
  const [ref, setRef] = useState({ current: null });

  const callbackRef = useCallback((node) => {
    if (node !== null) {
      setRef({ current: node });
    }
  }, []);

  const blockRendererFn = useCallback(
    (contentBlock) => blockRenderHelper(contentBlock, ref, false),
    [ref]
  );

  return (
    <Editor
      ref={callbackRef}
      editorState={editorState}
      blockRendererFn={blockRendererFn}
      readOnly={true}
    />
  );
};

Description.propTypes = {
  editorState: PropTypes.object.isRequired,
};

export default Description;
