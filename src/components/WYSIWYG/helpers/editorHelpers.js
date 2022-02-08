import {
  ContentBlock,
  EditorState,
  ContentState,
  SelectionState,
  RichUtils,
  genKey,
} from 'draft-js';
import { OrderedMap } from 'immutable';

import { TYPES } from '../constants';

const { TABLE, CELL } = TYPES;

const addEmptyBlock = (editorState, targetKey, position) => {
  const newBlock = new ContentBlock({
    key: genKey(),
    type: 'unstyled',
    text: '',
  });

  const contentState = editorState.getCurrentContent();
  const oldBlockMap = contentState.getBlockMap();
  const newBlockMap = OrderedMap().withMutations((map) => {
    for (let [k, v] of oldBlockMap.entries()) {
      if (targetKey === k && position === 'before') {
        map.set(newBlock.key, newBlock);
      }

      map.set(k, v);

      if (targetKey === k && position === 'after') {
        map.set(newBlock.key, newBlock);
      }
    }
  });

  return EditorState.forceSelection(
    EditorState.push(
      editorState,
      ContentState.createFromBlockArray(Array.from(newBlockMap.values()))
        .set('selectionBefore', contentState.getSelectionBefore())
        .set('selectionAfter', contentState.getSelectionAfter())
    ),
    SelectionState.createEmpty(newBlock.getKey())
  );
};

const removeTable = (editorState, tableKeys) => {
  const contentState = editorState.getCurrentContent();
  const newBlockMap = tableKeys.reduce(
    (map, key) => map.delete(key),
    contentState.getBlockMap()
  );

  return EditorState.forceSelection(
    EditorState.push(
      editorState,
      ContentState.createFromBlockArray(Array.from(newBlockMap.values()))
        .set('selectionBefore', contentState.getSelectionBefore())
        .set('selectionAfter', contentState.getSelectionAfter())
    ),
    editorState.getSelection()
  );
};

const getFirstTableBlock = (content, tableKey) => {
  let currentBlock = content.getBlockForKey(tableKey);
  let currentKey = tableKey;

  while (currentBlock.getType() !== TABLE) {
    currentKey = content.getKeyBefore(currentKey);
    currentBlock = content.getBlockForKey(currentKey);
  }

  return { block: currentBlock, blockKey: currentKey };
};

const getLastTableBlock = (content, tableKey) => {
  let currentBlock = content.getBlockForKey(tableKey);
  let currentKey = tableKey;

  while (
    !checkLastEditorBlock(content, currentKey) &&
    !checkLastTableBlock(content, currentKey)
  ) {
    currentKey = content.getKeyAfter(currentKey);
    currentBlock = content.getBlockForKey(currentBlock);
  }

  return { block: currentBlock, blockKey: currentKey };
};

const getSelectionKeys = (content, startKey, endKey) => {
  const keys = [];
  let key = startKey;

  while (key !== endKey) {
    keys.push(key);
    key = content.getKeyAfter(key);
  }
  keys.push(endKey);

  return keys;
};

const checkLastEditorBlock = (content, currentKey) => {
  const orderedMap = content.getBlockMap();
  const blockKeys = [...orderedMap.keys()];
  const currentIndex = blockKeys.findIndex((el) => el === currentKey);

  return currentIndex === blockKeys.length - 1;
};

const checkLastTableBlock = (content, currentKey) => {
  const nextKey = content.getKeyAfter(currentKey);
  const nextBlock = content.getBlockForKey(nextKey);

  return nextBlock.getType() !== CELL;
};

const checkTableCell = (type) => type === CELL || type === TABLE;

export const checkCurrentEmptyBlock = (editorState, key) => {
  const content = editorState.getCurrentContent();
  const blockText = content.getBlockForKey(key).getText();

  return blockText.length === 0;
};

export const TableHelpers = {
  insertUnstyledBlock: (editorState, anchorKey, position) => {
    const currentContent = editorState.getCurrentContent();
    const { blockKey: targetKey } =
      position === 'after'
        ? getLastTableBlock(currentContent, anchorKey)
        : getFirstTableBlock(currentContent, anchorKey);

    return addEmptyBlock(editorState, targetKey, position);
  },

  deleteTable: (editorState, tableKeys) => {
    const lastKey = tableKeys[tableKeys.length - 1];
    const newState = addEmptyBlock(editorState, lastKey, 'after');

    return removeTable(newState, tableKeys);
  },

  getAllTableKeysFromSelection: (editorState, startKey, endKey) => {
    let start = startKey;
    let end = endKey;

    const content = editorState.getCurrentContent();
    const startBlock = content.getBlockForKey(startKey);
    const endBlock = content.getBlockForKey(endKey);

    if (startBlock.getType() === CELL) {
      const { blockKey } = getFirstTableBlock(content, start);

      start = blockKey;
    }

    if (checkTableCell(endBlock.getType())) {
      const { blockKey } = getLastTableBlock(content, end);

      end = blockKey;
    }

    return getSelectionKeys(content, start, end);
  },

  checkTableSelection: (editorState, startKey, endKey) => {
    const content = editorState.getCurrentContent();
    const selectionKeys = getSelectionKeys(content, startKey, endKey);

    for (let key of selectionKeys) {
      const block = content.getBlockForKey(key);

      if (checkTableCell(block.getType())) {
        return true;
      }
    }

    return false;
  },

  checkAnchorInTable: (editorState) => {
    const blockType = RichUtils.getCurrentBlockType(editorState);

    return checkTableCell(blockType);
  },
};
