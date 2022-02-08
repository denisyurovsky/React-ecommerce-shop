import {
  ContentBlock,
  EditorState,
  ContentState,
  SelectionState,
} from 'draft-js';
import { Map, OrderedMap } from 'immutable';

import { TYPES, table } from '../constants';

import { checkCurrentEmptyBlock } from './editorHelpers';
import { getTableKey, getTableCellKey } from './getKey';

const { TABLE, CELL } = TYPES;
const { HEADER } = table;

const createTableBlocks = (numberOfRows, tableNumber) => {
  const tableBlocks = [];
  const numberOfCells = numberOfRows * 2;
  let row = 0;

  tableBlocks.push(createTableHeaderBlock(numberOfRows, tableNumber));

  for (let cell = 1; cell <= numberOfCells; cell++) {
    if (cell % 2) row++;

    const col = Math.floor(cell / row);

    tableBlocks.push(createCellBlock(row, col, tableNumber));
  }

  return tableBlocks;
};

const createTableHeaderBlock = (numberOfRows, tableNumber) =>
  new ContentBlock({
    key: getTableKey(tableNumber),
    type: TABLE,
    text: HEADER,
    data: Map({ numberOfRows, tableNumber }),
  });

const createCellBlock = (row, col, tableNumber) =>
  new ContentBlock({
    key: getTableCellKey(row, col, tableNumber),
    type: CELL,
    text: '',
    data: Map({ row, col, tableNumber }),
  });

const createTableBlockMap = (editorState, newBlocks) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const keyBefore = selectionState.getAnchorKey();
  const oldBlockMap = contentState.getBlockMap();

  return OrderedMap().withMutations((map) => {
    for (let [k, v] of oldBlockMap.entries()) {
      if (keyBefore === k) {
        if (!checkCurrentEmptyBlock(editorState, k)) {
          map.set(k, v);
        }

        for (let block of newBlocks) {
          map.set(block.key, block);
        }
      } else {
        map.set(k, v);
      }
    }
  });
};

export const addTable = (
  editorState,
  numberOfRows,
  tableNumber,
  resetRerender
) => {
  const newBlocks = createTableBlocks(numberOfRows, tableNumber);
  const newBlockMap = createTableBlockMap(editorState, newBlocks);
  const contentState = editorState.getCurrentContent();
  const selectedCell = newBlocks[1];

  resetRerender();

  return EditorState.acceptSelection(
    EditorState.push(
      editorState,
      ContentState.createFromBlockArray(Array.from(newBlockMap.values()))
        .set('selectionBefore', contentState.getSelectionBefore())
        .set('selectionAfter', contentState.getSelectionAfter()),
      'insert-fragment'
    ),
    SelectionState.createEmpty(selectedCell.getKey())
  );
};
