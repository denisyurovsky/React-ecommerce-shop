import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import validateField from '../../../helpers/validateField';

const CountryAutocomplete = ({
  handleChangeCountry,
  country,
  countries,
  className,
}) => {
  const { data, isLoading } = countries;
  const [isCountryValid, setIsCountryValid] = useState(true);

  const validateCountryField = (e) => {
    validateField(e, setIsCountryValid);
  };
  const suspendCountryFieldValidation = () => {
    setIsCountryValid(true);
  };

  return (
    <Autocomplete
      className={className}
      onChange={handleChangeCountry}
      value={country.name ? country : null}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      options={data}
      loading={isLoading}
      data-testid="autocomplete-country"
      renderOption={(props, option) => (
        <Box
          data-code={option.id}
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.id.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.id.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          onBlur={validateCountryField}
          onFocus={suspendCountryFieldValidation}
          error={!isCountryValid}
          helperText={isCountryValid ? ' ' : 'This field should not be empty'}
          variant="standard"
          {...params}
          label="Country"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

CountryAutocomplete.propTypes = {
  handleChangeCountry: PropTypes.func.isRequired,
  country: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  countries: PropTypes.shape({
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorOccurred: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default CountryAutocomplete;
