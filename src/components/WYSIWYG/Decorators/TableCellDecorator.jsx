import { EditorBlock } from 'draft-js';
import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';

import { getTableCellKey } from '../helpers/getKey';

import styles from './table.module.scss';

const TableCell = (props) => {
  const {
    block,
    blockProps: { editor },
  } = props;
  const { row, col, tableNumber } = block.getData().toJS();
  const target = editor?.editor.querySelector(
    `#${getTableCellKey(row, col, tableNumber)}`
  );

  if (!target) {
    return null;
  }

  return createPortal(
    <EditorBlock className={styles.cellContent} {...props} />,
    target
  );
};

TableCell.propTypes = {
  contentState: PropTypes.object.isRequired,
  blockProps: PropTypes.any,
  block: PropTypes.any,
};

export default TableCell;
