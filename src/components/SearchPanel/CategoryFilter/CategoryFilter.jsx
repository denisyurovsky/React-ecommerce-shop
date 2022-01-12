import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from './CategoryFilter.module.scss';

export const CategoryFilter = ({
  allCategories,
  isLoading,
  errorOccurred,
  className,
  setSearchParams,
}) => {
  const [category, setCategory] = useState(allCategories[0]);

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
    const categoryFilter =
      e.target.value === allCategories[0]
        ? null
        : [{ 'category.name': e.target.value }];

    setSearchParams((prev) => ({
      ...prev,
      filters: categoryFilter,
      currentPage: 1,
    }));
  };

  return (
    <FormControl
      disabled={isLoading || errorOccurred ? true : false}
      className={className}
      sx={{ position: 'relative' }}
    >
      {isLoading && (
        <Box className={styles.preloader}>
          <CircularProgress />
        </Box>
      )}
      <InputLabel htmlFor="uncontrolled-native">Category</InputLabel>
      <Select
        sx={{ minWidth: '180px' }}
        data-testid="select-category-input"
        onChange={handleSelectChange}
        value={category}
        label="Category"
        inputProps={{
          name: 'categories',
          id: 'uncontrolled-native',
        }}
      >
        {allCategories.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

CategoryFilter.propTypes = {
  allCategories: PropTypes.array.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorOccurred: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default CategoryFilter;
