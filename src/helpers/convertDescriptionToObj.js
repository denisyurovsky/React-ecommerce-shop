import { ContentState, convertFromRaw, EditorState } from 'draft-js';

import createDecorator from '../components/WYSIWYG/Decorators/Decorators';

const addSelection = (contentState) => {
  return EditorState.moveSelectionToEnd(
    EditorState.createWithContent(contentState, createDecorator())
  );
};

const convertDescription = (description) => {
  let parsedDescription;

  try {
    parsedDescription = JSON.parse(description);
  } catch (e) {
    parsedDescription = description;
  }

  const contentState =
    typeof parsedDescription === 'object'
      ? convertFromRaw(parsedDescription)
      : ContentState.createFromText(parsedDescription);

  const editorState = addSelection(contentState);

  return editorState;
};

export default convertDescription;
