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

export default function SortFilter({ setSearchParams }) {
  const [sort, setSort] = useState(sortTypes.NEW_FIRST);

  const handleChange = (event) => {
    setSort(event.target.value);
    setSearchParams((prev) => ({
      ...prev,
      sort: sortObj[event.target.value],
    }));
  };

  return (
    <Box sx={{ width: 220 }}>
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
};
