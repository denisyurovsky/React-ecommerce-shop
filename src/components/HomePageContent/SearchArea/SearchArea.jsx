import SearchIcon from '@mui/icons-material/Search';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  OutlinedInput,
  CircularProgress,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { notificationError } from '../../../constants/constants';

import styles from './SearchArea.module.scss';

export const SearchArea = ({ setDisplayedCards, categories, cards }) => {
  const [category, setCategory] = useState('All categories');
  const [textsearch, setTextsearch] = useState('');

  useEffect(() => {
    if (categories.errorOccurred) {
      toast.error(notificationError);
    }
  }, [categories.errorOccurred]);
  const handleSelectChange = (event) => {
    setCategory(event.target.value);
    setDisplayedCards(
      cards.filter(
        (card) =>
          card.name.includes(textsearch) &&
          (event.target.value === 'All categories'
            ? true
            : card.category.name === event.target.value)
      )
    );
  };

  const handleTextInput = (event) => {
    setDisplayedCards(
      cards.filter(
        (card) =>
          card.name.includes(event.target.value) &&
          (category !== 'All categories'
            ? category === card.category.name
            : true)
      )
    );
    setTextsearch(event.target.value);
  };

  return (
    <div className={styles.container}>
      {categories.isLoading ? (
        <CircularProgress />
      ) : (
        <FormControl className={styles.form}>
          <InputLabel htmlFor="uncontrolled-native"></InputLabel>
          <TextField
            select
            id="select-category-input"
            onChange={handleSelectChange}
            value={category}
            className={styles.select}
            label="Categories"
          >
            {categories.data.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
            <MenuItem value={'All categories'}>All categories</MenuItem>
          </TextField>
        </FormControl>
      )}
      <OutlinedInput
        data-testid="text-search-input"
        onChange={handleTextInput}
        value={textsearch}
        className={styles.textField}
        placeholder="Search by advertisement"
        endAdornment={
          <Button variant="outlined" className={styles.searchButton}>
            <SearchIcon />
          </Button>
        }
      />
    </div>
  );
};

SearchArea.propTypes = {
  categories: PropTypes.shape({
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    errorOccurred: PropTypes.bool,
    errorMessage: PropTypes.string,
  }),
  setDisplayedCards: PropTypes.func,
  cards: PropTypes.array,
};
