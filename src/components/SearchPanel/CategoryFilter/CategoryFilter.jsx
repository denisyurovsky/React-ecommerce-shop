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
  setFilterProperties,
}) => {
  const [category, setCategory] = useState(allCategories[0]);

  const handleSelectChange = (event) => {
    setCategory(event.target.value);

    setFilterProperties((prev) => ({
      ...prev,
      category: event.target.value,
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
  setFilterProperties: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorOccurred: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default CategoryFilter;
