import Autocomplete, {
  autocompleteClasses,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import validateField from '../../../helpers/validateField';
import addressType from '../../../propTypes/addressType';

import ListboxComponent from './helpers/ListboxComponent';

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

const VirtualizedAutocomplete = ({ data, setAddress, address, label }) => {
  const filter = createFilterOptions();
  const handleChange = (event, newValue) => {
    const city = newValue === null ? '' : newValue;

    if (city.inputValue) {
      setAddress({
        ...address,
        city: city.inputValue,
      });
    } else {
      setAddress({
        ...address,
        city,
      });
    }
  };

  const [isCityValid, setIsCityValid] = useState(true);
  const validateCityField = (e) => {
    validateField(e, setIsCityValid);
  };
  const suspendCityFieldValidation = () => {
    setIsCityValid(true);
  };

  return (
    <Autocomplete
      disabled={!address.country.name}
      onChange={handleChange}
      value={address.city ? address.city : null}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      data-testid="autocomplete-city"
      isOptionEqualToValue={(option, value) => option.name === value.name}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => {
          return option.toUpperCase() === inputValue.toUpperCase();
        });

        if (inputValue !== '' && !isExisting) {
          filtered.push(`"${inputValue}"`);
        }

        return filtered;
      }}
      getOptionLabel={(option) => option}
      options={[...data].sort()}
      groupBy={(city) => city[0].toUpperCase()}
      renderInput={(params) => (
        <TextField
          onBlur={validateCityField}
          onFocus={suspendCityFieldValidation}
          error={!isCityValid}
          helperText={isCityValid ? ' ' : 'This field should not be empty'}
          variant="standard"
          {...params}
          label={label}
        />
      )}
      renderOption={(props, option) => [props, option]}
      renderGroup={(params) => params}
    />
  );
};

VirtualizedAutocomplete.propTypes = {
  data: PropTypes.array.isRequired,
  setAddress: PropTypes.func.isRequired,
  address: addressType.isRequired,
  label: PropTypes.string.isRequired,
};

export default VirtualizedAutocomplete;
