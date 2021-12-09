import SearchIcon from '@mui/icons-material/Search';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  OutlinedInput,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from './SearchArea.module.scss';

export const SearchArea = ({ setCards, initialCards }) => {
  const [category, setCategory] = useState('All categories');
  const [textsearch, setTextsearch] = useState('');

  const handleSelectChange = (event) => {
    setCategory(event.target.value);
    setCards(
      initialCards.filter(
        (card) =>
          card.name.includes(textsearch) &&
          (event.target.value === 'All categories'
            ? true
            : card.type === event.target.value)
      )
    );
  };

  const handleTextInput = (event) => {
    setCards(
      initialCards.filter(
        (card) =>
          card.name.includes(event.target.value) &&
          (category !== 'All categories' ? category === card.type : true)
      )
    );
    setTextsearch(event.target.value);
  };

  return (
    <div className={styles.container}>
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
          <MenuItem value={'First category'}>First category</MenuItem>
          <MenuItem value={'Second category'}>Second category</MenuItem>
          <MenuItem value={'Third category'}>Third category</MenuItem>
          <MenuItem value={'All categories'}>All categories</MenuItem>
        </TextField>
      </FormControl>
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
  setCards: PropTypes.func,
  initialCards: PropTypes.array,
};
