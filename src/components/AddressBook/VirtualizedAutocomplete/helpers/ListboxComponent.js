import { Typography } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { VariableSizeList } from 'react-window';

import {
  DOUBLE_LISTBOX_PADDING,
  LISTBOX_PADDING,
  LIMIT_NUMBER_ITEMS,
  ITEM_SIZE_MD,
  ITEM_SIZE_LG,
} from '../../constatns/constatns';

const renderRow = ({ data, index, style }) => {
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  if (Object.prototype.hasOwnProperty.call(dataSet, 'group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  );
};

const useResetCache = (data) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);

  return ref;
};

const OuterElementContext = createContext({});

const OuterElementType = forwardRef((props, ref) => {
  const outerProps = useContext(OuterElementContext);

  return <div ref={ref} {...props} {...outerProps} />;
});

OuterElementType.displayName = 'MyComponent';

const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];

  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  const itemCount = itemData.length;
  const itemSize = smUp ? ITEM_SIZE_MD : ITEM_SIZE_LG;

  const getChildSize = (child) => {
    if (Object.prototype.hasOwnProperty.call(child, 'group')) {
      return ITEM_SIZE_LG;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > LIMIT_NUMBER_ITEMS) {
      return LIMIT_NUMBER_ITEMS * itemSize;
    }

    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + DOUBLE_LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.array,
};

export default ListboxComponent;
