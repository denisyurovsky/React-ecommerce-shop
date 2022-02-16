import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import ruLocale from 'date-fns/locale/ru';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import formatPhoneNumber from '../../../helpers/formatPhoneNumber';

import styles from './ProfileFields.module.scss';

function ProfileFields({ profile, setProfile, disabled, isEmailWrong }) {
  const { firstName, lastName, email, phoneNumber } = profile;

  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);

  useEffect(() => {
    setGender(profile.gender);
    setDateOfBirth(profile.dateOfBirth);
  }, [profile.gender, profile.dateOfBirth]);

  const handleChange = (e) => {
    const { id, name, value } = e.target;

    setProfile({ ...profile, [id || name]: value });
  };

  const handleGenderSelect = (e) => {
    setGender(e.target.value);
    handleChange(e);
  };

  const handleDateOfBirth = (date) => {
    setProfile({ ...profile, dateOfBirth: date });
  };

  const handlePhoneNumberChange = (e) => {
    const phone = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);

    setProfile({ ...profile, [e.target.id]: phone });
  };

  const handleDatePicker = (date) => {
    setDateOfBirth(date);
    handleDateOfBirth(date);
  };

  return (
    <div className={styles.container}>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          className={styles.textField}
          id="firstName"
          label="First Name"
          error={!firstName?.length}
          helperText={!firstName?.length ? 'First Name is required' : null}
          value={firstName}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          className={styles.textField}
          id="lastName"
          label="Last Name"
          error={!lastName?.length}
          helperText={!lastName?.length ? 'Last Name is required' : null}
          value={lastName}
          onChange={handleChange}
          disabled={disabled}
        />

        <FormControl className={`${styles.textField} ${styles.formControl}`}>
          <InputLabel id="gender-label" className={styles.genderLabel}>
            Gender
          </InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={gender}
            label="Gender"
            onChange={handleGenderSelect}
            disabled={disabled}
          >
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={`${styles.textField} ${styles.formControl}`}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <DatePicker
              label="Date Of Birth"
              mask={'__.__.____'}
              minDate={new Date('1900-01-01')}
              maxDate={Date.now()}
              disabled={disabled}
              value={dateOfBirth}
              onChange={handleDatePicker}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>

        <TextField
          className={styles.textField}
          id="phoneNumber"
          label="Phone Number"
          value={formatPhoneNumber(phoneNumber)}
          onChange={handlePhoneNumberChange}
          disabled={disabled}
        />

        <TextField
          className={styles.textField}
          id="email"
          label="Email"
          error={isEmailWrong}
          helperText={isEmailWrong ? 'The email is invalid' : null}
          value={email}
          onChange={handleChange}
          disabled={disabled}
        />
      </Box>
    </div>
  );
}

ProfileFields.propTypes = {
  disabled: PropTypes.bool.isRequired,
  setProfile: PropTypes.func.isRequired,
  isEmailWrong: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    dateOfBirth: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
  }).isRequired,
};

export default ProfileFields;
