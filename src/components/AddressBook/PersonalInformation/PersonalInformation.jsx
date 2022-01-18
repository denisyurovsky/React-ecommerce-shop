import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import formatPhoneNumber from '../../../helpers/formatPhoneNumber';
import validateField from '../../../helpers/validateField';
import addressType from '../../../propTypes/addressType';

import styles from './PersonalInformation.module.scss';

const PersonalInformation = ({ handleChange, address, setAddress }) => {
  const { title, name, surname, phone } = address;
  const handlePhoneNumberChange = (e) => {
    const phone = formatPhoneNumber(
      e.target.value.replace(/[^0-9]/g, '').slice(0, 11)
    );

    setAddress({ ...address, phone });
  };

  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isSurnameValid, setIsSurnameValid] = useState(true);

  const validatePhoneNumber = (e) => {
    const phoneNumberLength = e.target.value.length;

    setIsPhoneNumberValid(phoneNumberLength === 16);
  };

  const validateTitleField = (e) => {
    validateField(e, setIsTitleValid);
  };
  const suspendTitleFieldValidation = () => {
    setIsTitleValid(true);
  };
  const validateNameField = (e) => {
    validateField(e, setIsNameValid);
  };
  const suspendNameFieldValidation = () => {
    setIsNameValid(true);
  };
  const validateSurnameField = (e) => {
    validateField(e, setIsSurnameValid);
  };
  const suspendSurnameFieldValidation = () => {
    setIsSurnameValid(true);
  };
  const suspendPhoneFieldValidation = () => {
    setIsPhoneNumberValid(true);
  };

  return (
    <>
      <Box className={styles.wrapperFullName}>
        <FormControl
          className={styles.title}
          variant="standard"
          onBlur={validateTitleField}
          onFocus={suspendTitleFieldValidation}
          error={!isTitleValid}
        >
          <InputLabel id="title">Title</InputLabel>
          <Select
            data-testid="select-title"
            labelId="title"
            name="title"
            value={title}
            onChange={handleChange}
            label="Title"
          >
            <MenuItem value={'Mr.'}>Mr.</MenuItem>
            <MenuItem value={'Mrs.'}>Mrs.</MenuItem>
          </Select>
        </FormControl>
        <Box className={styles.wrapper}>
          <TextField
            className={styles.name}
            onChange={handleChange}
            id="name"
            value={name}
            label="Name"
            variant="standard"
            onBlur={validateNameField}
            onFocus={suspendNameFieldValidation}
            error={!isNameValid}
            helperText={isNameValid ? ' ' : 'This field should not be empty'}
          />
          <TextField
            className={styles.surname}
            onChange={handleChange}
            id="surname"
            value={surname}
            label="Surname"
            variant="standard"
            onBlur={validateSurnameField}
            onFocus={suspendSurnameFieldValidation}
            error={!isSurnameValid}
            helperText={isSurnameValid ? ' ' : 'This field should not be empty'}
          />
        </Box>
      </Box>
      <TextField
        label="Phone"
        variant="standard"
        value={phone}
        onChange={handlePhoneNumberChange}
        onBlur={validatePhoneNumber}
        onFocus={suspendPhoneFieldValidation}
        error={!isPhoneNumberValid}
        helperText={isPhoneNumberValid ? ' ' : 'The phone number is invalid'}
      />
    </>
  );
};

PersonalInformation.propTypes = {
  handleChange: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  address: addressType.isRequired,
};

export default PersonalInformation;
