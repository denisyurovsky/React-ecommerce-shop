import { getDefaultKeyBinding, RichUtils } from 'draft-js';

import { KEYS } from '../../../constants/constants';
import { TYPES } from '../constants';

import { TableHelpers, checkCurrentEmptyBlock } from './editorHelpers';

export const handleKeyHelper = (command, editorState, handleChange) => {
  const selectionState = editorState.getSelection();
  const anchorKey = selectionState.getAnchorKey();
  const currentPosition = selectionState.getAnchorOffset();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  const currentBlockType = RichUtils.getCurrentBlockType(editorState);

  const isCollapsed = selectionState.isCollapsed();
  const isTableStart =
    currentBlockType === TYPES.TABLE && currentPosition === 0 && isCollapsed;
  const position = isTableStart ? 'before' : 'after';

  if (TableHelpers.checkTableSelection(editorState, startKey, endKey)) {
    switch (command) {
      case 'split-block':
        handleChange(
          TableHelpers.insertUnstyledBlock(editorState, anchorKey, position)
        );

        return 'handled';
      case 'delete-table':
        handleChange(
          TableHelpers.deleteTable(
            editorState,
            TableHelpers.getAllTableKeysFromSelection(
              editorState,
              startKey,
              endKey
            )
          )
        );

        return 'handled';
      case 'table-enter':
        handleChange(RichUtils.insertSoftNewline(editorState));

        return 'handled';
    }
  }
  const newState = RichUtils.handleKeyCommand(editorState, command);

  if (newState) {
    handleChange(newState);

    return 'handled';
  }

  return 'not-handled';
};

export const keyBindingHelper = (editorState, e) => {
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();
  const isCollapsed = selection.isCollapsed();
  const anchorKey = selection.getAnchorKey();

  if (TableHelpers.checkTableSelection(editorState, startKey, endKey)) {
    switch (e.key) {
      case KEYS.ENTER:
        if (e.shiftKey && isCollapsed) return 'table-enter';
        break;
      case KEYS.BACKSPACE:
      case KEYS.DELETE:
        if (startKey !== endKey) return 'delete-table';
        if (checkCurrentEmptyBlock(editorState, anchorKey)) return;
        break;
      default:
        if (startKey !== endKey) return 'handled';
    }
  }

  return getDefaultKeyBinding(e);
};
