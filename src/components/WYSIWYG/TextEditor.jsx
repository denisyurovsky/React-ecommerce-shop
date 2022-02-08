import { Box } from '@mui/material';
import classNames from 'classnames';
import { Editor, EditorState, Modifier } from 'draft-js';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect, useCallback } from 'react';

import { EDITOR_MAX_SYMBOLS } from './constants';
import createDecorator from './Decorators/Decorators';
import EditorFooter from './EditorFooter';
import { blockRenderHelper } from './helpers/blockRenderHelper';
import { TableHelpers } from './helpers/editorHelpers';
import { getTableCellKey } from './helpers/getKey';
import { handleKeyHelper, keyBindingHelper } from './helpers/keyBindingHelper';
import Toolbar from './Modifiers/Toolbar';

import styles from './textEditor.module.scss';

const TextEditor = (props) => {
  const { label, editorState, setEditorState, error, helperText } = props;
  const [isInteracted, setIsInteracted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(error);
  const [symbolsLeft, setSymbolsLeft] = useState(EDITOR_MAX_SYMBOLS);
  const [isRerender, setIsRerendered] = useState(false);
  const isExtraSpace = symbolsLeft === 0;
  const editor = useRef();

  const resetRerender = () => setIsRerendered(true);
  const getCurrentLength = useCallback(
    () => editorState.getCurrentContent().getPlainText('').length,
    [editorState]
  );

  const checkError = useCallback(
    () => isExtraSpace || error,
    [isExtraSpace, error]
  );

  const adjustLeftSymbols = useCallback(
    () => setSymbolsLeft(EDITOR_MAX_SYMBOLS - getCurrentLength()),
    [getCurrentLength]
  );

  const focusEditor = () => {
    setIsError(checkError());
    setIsFocused(true);
    editor.current.focus();
  };

  const onBlur = () => {
    setIsError(false);
    setIsFocused(false);
  };

  useEffect(() => {
    setIsError(error);
  }, [error]);

  useEffect(() => {
    adjustLeftSymbols();
  }, [editorState, adjustLeftSymbols]);

  useEffect(() => {
    setIsError(checkError());
  }, [symbolsLeft, checkError]);

  useEffect(() => {
    const content = editorState.getCurrentContent();

    if (content.getBlockForKey(getTableCellKey(1, 1, 0)) && !isRerender) {
      setEditorState(
        EditorState.moveSelectionToEnd(
          EditorState.createWithContent(content, createDecorator())
        )
      );
      setIsRerendered(true);
    }
  }, [editorState, setIsRerendered, isRerender, setEditorState]);

  const handleChange = (newState) => setEditorState(newState);

  const processTextBeforeInput = (pastedText = 'd') => {
    if (pastedText.length < symbolsLeft) return 'non-handled';

    const newContent = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      pastedText.slice(0, symbolsLeft),
      editorState.getCurrentInlineStyle()
    );

    setEditorState(
      EditorState.push(editorState, newContent, 'insert-characters')
    );
    setIsError(true);

    return 'handled';
  };

  const handleBeforeInput = () => processTextBeforeInput();
  const handlePastedText = (pastedText) => processTextBeforeInput(pastedText);

  const handleKeyCommand = (command, editorState) =>
    handleKeyHelper(command, editorState, handleChange);
  const keyBindingFn = (e) => keyBindingHelper(editorState, e);

  const blockRendererFn = (contentBlock) =>
    blockRenderHelper(contentBlock, editor);

  const isAnchorInTable =
    isFocused && TableHelpers.checkAnchorInTable(editorState);

  return (
    <Box onClick={focusEditor} tabIndex={-1} className={styles.wraper}>
      <fieldset
        className={classNames({
          [styles.container]: true,
          [styles.focused]: isFocused,
          [styles.error]: isError,
        })}
      >
        <legend className={styles.legend}>{label}</legend>
        <Toolbar
          editorState={editorState}
          handleChange={handleChange}
          setIsInteracted={setIsInteracted}
          isAnchorInTable={isAnchorInTable}
          isExtraSpace={isExtraSpace}
          resetRerender={resetRerender}
        />
        <Box className={styles.editor}>
          <Editor
            ref={editor}
            onBlur={onBlur}
            editorState={editorState}
            onChange={handleChange}
            keyBindingFn={keyBindingFn}
            handleKeyCommand={handleKeyCommand}
            handleBeforeInput={handleBeforeInput}
            handlePastedText={handlePastedText}
            blockRendererFn={blockRendererFn}
            readOnly={isInteracted}
            spellCheck
          />
        </Box>
        <EditorFooter
          symbolsLeft={symbolsLeft}
          isFocused={isFocused}
          isAnchorInTable={isAnchorInTable}
          errorText={helperText}
        />
      </fieldset>
    </Box>
  );
};

TextEditor.defaultProps = {
  label: 'Description',
  error: false,
  helperText: null,
};

TextEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  setEditorState: PropTypes.func.isRequired,
  label: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default TextEditor;
