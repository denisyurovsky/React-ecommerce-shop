import { Box, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { notificationError } from '../../../constants/constants';
import validateField from '../../../helpers/validateField';
import usePrevious from '../../../hooks/usePrevious';
import { RUSSIA } from '../../../pages/AddressBookPage/constants/constants';
import addressType from '../../../propTypes/addressType';
import { getCities, selectCities } from '../../../store/cities/citiesSlice';
import {
  getCountries,
  selectCountries,
} from '../../../store/countries/countriesSlice';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';
import formatRussianZip from '../helpers/formatRussianZip';
import VirtualizedAutocomplete from '../VirtualizedAutocomplete/VirtualizedAutocomplete.jsx';

import styles from './DeliveryAddress.module.scss';

const DeliveryAddress = ({ handleChange, address, setAddress }) => {
  const {
    country,
    zip,
    street,
    building,
    flat,
    country: { name: countryName, id: countryCode },
  } = address;
  const countries = useSelector(selectCountries);
  const cities = useSelector(selectCities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCities(countryCode));
  }, [countryCode, dispatch]);

  const { errorOccurred: citiesErrorOccurred } = cities;
  const { errorOccurred: countriesErrorOccurred } = countries;
  const prevAmount = usePrevious({
    citiesErrorOccurred,
    countriesErrorOccurred,
  });

  useEffect(() => {
    const isErrorOccurred = countriesErrorOccurred || citiesErrorOccurred;

    if (prevAmount) {
      const isErrorOccurredPrev =
        prevAmount.citiesErrorOccurred || prevAmount.countriesErrorOccurred;

      if (isErrorOccurredPrev !== isErrorOccurred && isErrorOccurred) {
        toast.error(notificationError);
      }
    }
  }, [countriesErrorOccurred, citiesErrorOccurred, prevAmount]);

  const [isStreetValid, setIsStreetValid] = useState(true);
  const [isBuildingValid, setIsBuildingValid] = useState(true);
  const [isZipValid, setIsZipValid] = useState(true);

  const handleChangeCountry = (e, newValue) => {
    const country = newValue === null ? { name: '', id: '' } : newValue;
    const formattedZip = country.name === RUSSIA ? formatRussianZip(zip) : zip;

    setAddress({
      ...address,
      country,
      city: '',
      zip: formattedZip,
    });
  };

  const handleChangeZip = (e) => {
    const { value } = e.target;
    const zip = countryName === RUSSIA ? formatRussianZip(value) : value;

    setAddress({ ...address, zip });
  };

  const validateZipField = () => {
    if (countryName === RUSSIA) {
      setIsZipValid(zip.length === 6);
    } else {
      setIsZipValid(Boolean(zip));
    }
  };

  const validateStreetField = (e) => {
    validateField(e, setIsStreetValid);
  };
  const suspendStreetFieldValidation = () => {
    setIsStreetValid(true);
  };
  const validateBuildingField = (e) => {
    validateField(e, setIsBuildingValid);
  };
  const suspendBuildingFieldValidation = () => {
    setIsBuildingValid(true);
  };
  const suspendZipFieldValidation = () => {
    setIsZipValid(true);
  };

  return (
    <>
      <Box className={styles.wrapper}>
        <CountryAutocomplete
          className={styles.country}
          handleChangeCountry={handleChangeCountry}
          country={country}
          countries={countries}
        />
        <VirtualizedAutocomplete
          setAddress={setAddress}
          address={address}
          data={cities.data}
          label="City"
        />
      </Box>
      <TextField
        fullWidth
        onChange={handleChange}
        id="street"
        value={street}
        label="Street"
        variant="standard"
        onBlur={validateStreetField}
        onFocus={suspendStreetFieldValidation}
        error={!isStreetValid}
        helperText={isStreetValid ? ' ' : 'This field should not be empty'}
      />
      <Box className={styles.wrapper}>
        <TextField
          className={styles.building}
          onChange={handleChange}
          id="building"
          value={building}
          label="Building"
          variant="standard"
          onBlur={validateBuildingField}
          onFocus={suspendBuildingFieldValidation}
          error={!isBuildingValid}
          helperText={isBuildingValid ? ' ' : 'This field should not be empty'}
        />
        <TextField
          onChange={handleChange}
          id="flat"
          value={flat}
          label="Flat"
          variant="standard"
        />
      </Box>
      <TextField
        fullWidth
        label="Zip"
        variant="standard"
        value={zip}
        onChange={handleChangeZip}
        onBlur={validateZipField}
        onFocus={suspendZipFieldValidation}
        error={!isZipValid}
        helperText={isZipValid ? ' ' : 'The zip is invalid'}
      />
    </>
  );
};

DeliveryAddress.propTypes = {
  handleChange: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  address: addressType.isRequired,
};

export default DeliveryAddress;
