import { Editor, EditorState } from 'draft-js';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

import createDecorator from '../components/WYSIWYG/Decorators/Decorators';
import { blockRenderHelper } from '../components/WYSIWYG/helpers/blockRenderHelper';

const Description = ({ contentState }) => {
  const [ref, setRef] = useState({ current: null });

  const callbackRef = useCallback((node) => {
    if (node !== null) {
      setRef({ current: node });
    }
  }, []);

  const editorState = EditorState.createWithContent(
    contentState,
    createDecorator()
  );

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
  contentState: PropTypes.object.isRequired,
};

export default Description;
