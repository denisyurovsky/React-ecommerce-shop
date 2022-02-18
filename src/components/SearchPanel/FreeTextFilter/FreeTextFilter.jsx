import SearchIcon from '@mui/icons-material/Search';
import { OutlinedInput, Button, Box } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from './FreeTextFilter.module.scss';

const FreeTextFilter = ({ className, setSearchParams, selectedText }) => {
  const [value, setValue] = useState(selectedText);
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const q = formData.get('searchValue');

    setSearchParams((prev) => ({
      ...prev,
      q,
      currentPage: 1,
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleOnSubmit}
      className={classNames({ [styles.wrapper]: true, [className]: true })}
    >
      <OutlinedInput
        value={value}
        name="searchValue"
        sx={{
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px',
          flexGrow: 1,
        }}
        onChange={(e) => setValue(e.target.value)}
        className={styles.input}
        placeholder="Search by advertisement"
      />
      <Button
        type="submit"
        sx={{
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
        }}
        variant="contained"
        color="primary"
      >
        <SearchIcon color="white" />
      </Button>
    </Box>
  );
};

FreeTextFilter.propTypes = {
  setSearchParams: PropTypes.func.isRequired,
  selectedText: PropTypes.string,
  className: PropTypes.string,
};

export default FreeTextFilter;
