import { TYPES } from '../constants';
import TableCell from '../Decorators/TableCellDecorator';
import Table from '../Decorators/TableDecorator';

export const blockRenderHelper = (contentBlock, ref, isEditable = true) => {
  const type = contentBlock.getType();

  switch (type) {
    case TYPES.CELL:
      return {
        component: TableCell,
        editable: isEditable,
        props: {
          editor: ref.current,
        },
      };
    case TYPES.TABLE:
      return {
        component: Table,
        editable: isEditable,
        props: {
          editor: ref.current,
        },
      };
  }
};
