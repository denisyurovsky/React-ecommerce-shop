import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getWishlistsStatus } from '../../../../store/user/userSlice';
import { FetchStatus } from '../../../../ts/enums/enums';
import LoadingButton from '../../../ui-kit/buttons/LoadingButton';

import styles from './CreateWishlistForm.module.scss';

const DEFAULT_VALUE_INPUT = 'Type the name of new wishlist';
const checkWishlistNameIsUnique = (name, wishlists) =>
  !wishlists.some((wishlist) => name === wishlist.name);
const NAME_ERROR_MESSAGE = 'Wishlist name should be unique';
const message = {
  error: (wishlistName) =>
    `The wishlist "${wishlistName}" was not added to your wishlists by some reason. Please try again later`,
  success: (wishlistName) =>
    `The wishlist "${wishlistName}" was successfully added to your wishlists`,
};

export const CreateWishlistForm = ({
  checkedWishlists,
  createWishlist,
  closeCreateWishlistForm,
}) => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const status = useSelector(getWishlistsStatus);

  const handleInputChange = (event) => {
    setName(event.target.value);
    const isUnique = checkWishlistNameIsUnique(
      event.target.value,
      checkedWishlists
    );
    const isNotEmpty = Boolean(event.target.value.length);

    setIsNameValid(isUnique && isNotEmpty);
  };

  const handleCreateButtonClick = () => {
    createWishlist(name);
  };

  useEffect(() => {
    if (status === FetchStatus.Fulfilled && name) {
      toast.success(message.success(name));
      closeCreateWishlistForm(name);
      setName('');
    }
    if (status === FetchStatus.Rejected && name) {
      toast.error(message.error(name));
      closeCreateWishlistForm();
      setName('');
    }
  }, [status, name, closeCreateWishlistForm]);

  return (
    <FormControl
      className={styles.formAddNewWishlist}
      data-testid="formAddNewWishlist"
      variant="standard"
    >
      <InputLabel htmlFor="wishlist-name">Name</InputLabel>
      <Input
        fullWidth
        id="wishlist-name"
        placeholder={DEFAULT_VALUE_INPUT}
        value={name}
        error={!checkWishlistNameIsUnique(name, checkedWishlists)}
        onChange={handleInputChange}
        aria-describedby="component-helper-text"
        inputProps={{ maxLength: 150 }}
      />
      <FormHelperText className={styles.helper} id="component-helper-text">
        <span>
          {!checkWishlistNameIsUnique(name, checkedWishlists)
            ? NAME_ERROR_MESSAGE
            : null}
        </span>
        <span>{name.length}&nbsp;/&nbsp;150</span>
      </FormHelperText>
      <Box className={styles.createButtonWrapper}>
        {status === FetchStatus.Pending ? (
          <LoadingButton label="" fullWidth />
        ) : (
          <Button
            className={styles.createButton}
            disabled={!isNameValid}
            onClick={handleCreateButtonClick}
          >
            create
          </Button>
        )}
      </Box>
    </FormControl>
  );
};

CreateWishlistForm.propTypes = {
  checkedWishlists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      checked: PropTypes.bool,
    })
  ).isRequired,
  createWishlist: PropTypes.func.isRequired,
  closeCreateWishlistForm: PropTypes.func.isRequired,
};
