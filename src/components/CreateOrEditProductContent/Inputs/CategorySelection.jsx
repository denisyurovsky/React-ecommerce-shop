import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCategories } from '../../../store/categories/categoriesSlice';
import { SELECTION_ERROR } from '../constants';

const CategorySelection = ({ value, onChange, disableSubmit }) => {
  const categories = useSelector(selectCategories); //What if error

  const [category, setCategory] = useState(value);
  const [isError, setIsError] = useState(false);

  const checkValidity = (value) => value !== '';

  const onCategoryChange = (ev) => {
    const newCategory = ev.target.value;

    setCategory(newCategory);

    if (checkValidity(newCategory)) {
      setIsError(false);
      onChange(newCategory);

      return;
    }

    setIsError(true);
    disableSubmit();
  };

  return (
    <FormControl error={isError}>
      <InputLabel id="selectLabel">Category</InputLabel>
      <Select
        id="selectLabel"
        labelId="selectLabel"
        label="Category"
        value={category}
        selected_value={category}
        onChange={onCategoryChange}
        fullWidth
      >
        <MenuItem value="">None</MenuItem>
        {categories.data.map((category) => {
          return (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          );
        })}
      </Select>
      {isError && <FormHelperText>{SELECTION_ERROR}</FormHelperText>}
    </FormControl>
  );
};

CategorySelection.defaultProps = {
  value: '',
};

CategorySelection.propTypes = {
  onChange: PropTypes.func.isRequired,
  disableSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default CategorySelection;
