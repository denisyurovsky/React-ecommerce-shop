import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  sortTypes,
  sortObj,
} from '../../../pages/ProductListPage/constants/constants';

export default function SortFilter({
  setSearchParams,
  fullWidth,
  selectedSortType,
}) {
  const convertSortObjectIntoString = (selectedSortType) => {
    if (selectedSortType.field === sortObj[sortTypes.NEW_FIRST].field) {
      if (selectedSortType.order === sortObj[sortTypes.NEW_FIRST].order) {
        return sortTypes.NEW_FIRST;
      } else {
        return sortTypes.OLD_FIRST;
      }
    }
    if (selectedSortType.field === sortObj[sortTypes.EXPENSIVE_FIRST].field) {
      if (selectedSortType.order === sortObj[sortTypes.EXPENSIVE_FIRST].order) {
        return sortTypes.EXPENSIVE_FIRST;
      } else {
        return sortTypes.CHEAP_FIRST;
      }
    }
  };

  const [sort, setSort] = useState(
    convertSortObjectIntoString(selectedSortType)
  );

  const handleChange = (event) => {
    setSort(event.target.value);
    setSearchParams((prev) => ({
      ...prev,
      sort: sortObj[event.target.value],
      currentPage: 1,
    }));
  };

  return (
    <Box sx={{ width: fullWidth ? '100%' : 220 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Filter
        </InputLabel>
        <NativeSelect
          value={sort}
          inputProps={{
            name: 'sort',
            id: 'uncontrolled-native',
          }}
          onChange={handleChange}
        >
          <option value={sortTypes.NEW_FIRST}>From new to old</option>
          <option value={sortTypes.OLD_FIRST}>From old to new</option>
          <option value={sortTypes.EXPENSIVE_FIRST}>
            From expensive to cheap
          </option>
          <option value={sortTypes.CHEAP_FIRST}>From cheap to expensive</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

SortFilter.propTypes = {
  setSearchParams: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  selectedSortType: PropTypes.object,
};
