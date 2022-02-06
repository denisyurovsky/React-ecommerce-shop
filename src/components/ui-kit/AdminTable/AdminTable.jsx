import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React from 'react';

import { Title } from '../../Title/Title';

import styles from './AdminTable.module.scss';

export const AdminTable = ({
  tableName,
  children,
  columnBuffer,
  autoHeight,
  rowHeight,
  columns,
  rows,
}) => {
  return (
    <div className={styles.container}>
      <Title>{tableName}</Title>
      {children || null}
      <DataGrid
        columnBuffer={columnBuffer}
        autoHeight={autoHeight}
        rowHeight={rowHeight}
        columns={columns}
        rows={rows}
      />
    </div>
  );
};

AdminTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  columnBuffer: PropTypes.number.isRequired,
  tableName: PropTypes.string,
  children: PropTypes.object,
  autoHeight: PropTypes.bool,
  rowHeight: PropTypes.number,
};
