import { EditorBlock } from 'draft-js';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableCellKey } from '../helpers/getKey';

import styles from './table.module.scss';

const Table = (props) => {
  const { block } = props;
  const { numberOfRows, tableNumber } = block.getData().toJS();
  const rowsArray = [];

  for (let i = 0; i < numberOfRows; i++) {
    rowsArray.push(i);
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.head}>
          <th colSpan={2} className={styles.cell}>
            <EditorBlock className={styles.cellContent} {...props} />
          </th>
        </tr>
      </thead>
      <tbody>
        {rowsArray.map((index) => (
          <tr key={index} className={styles.row}>
            <td
              className={styles.cell}
              id={getTableCellKey(index + 1, 1, tableNumber)}
            ></td>
            <td
              className={styles.cell}
              id={getTableCellKey(index + 1, 2, tableNumber)}
            ></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  blockProps: PropTypes.any,
  block: PropTypes.any,
};

export default Table;
