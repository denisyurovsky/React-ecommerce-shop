import { EditorState } from 'draft-js';
import React, { useState } from 'react';

import TextEditor from './TextEditor';

const Wrapper = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <TextEditor editorState={editorState} setEditorState={setEditorState} />
  );
};

export default {
  title: 'WYSIWYG',
  component: Wrapper,
};

const Template = (args) => <Wrapper {...args} />;

export const Default = Template.bind({});
Default.args = {};
