import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import checkForLatinText from '../../../helpers/checkForLatinText';
import TextEditor from '../../WYSIWYG/TextEditor';
import { DESCRIPTION_ERROR } from '../constants';

const DescriptionEditor = ({ value, onChange, disableSubmit }) => {
  const isEditPage = useLocation().pathname.includes('edit');

  const [editorState, setEditorState] = useState(value);
  const [isError, setIsError] = useState(false);
  const [textLength, setTextLength] = useState(0);

  const checkValidity = (text) => checkForLatinText(text) && text.length > 0;

  const onDescriptionChange = (state) => {
    const plainText = state.getCurrentContent().getPlainText('');

    setTextLength(plainText.length);
    setEditorState(state);

    if (checkValidity(plainText)) {
      setIsError(false);
      onChange(state);

      return;
    }

    setIsError(true);
    disableSubmit();
  };

  const displayError = isError && textLength > 0;

  return (
    <TextEditor
      label="Description"
      editorState={editorState}
      setEditorState={onDescriptionChange}
      error={displayError}
      helperText={displayError ? DESCRIPTION_ERROR : null}
      isEdit={isEditPage}
    />
  );
};

DescriptionEditor.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disableSubmit: PropTypes.func.isRequired,
};

export default DescriptionEditor;
