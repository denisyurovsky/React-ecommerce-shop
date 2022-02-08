export const getTableCellKey = (row, col, tableNumber) =>
  `CELL-${row}${col}${tableNumber}`;

export const getTableKey = (tableNumber) => `TABLE-${tableNumber}`;
