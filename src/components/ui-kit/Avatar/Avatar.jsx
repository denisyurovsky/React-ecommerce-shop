import { Avatar as AvatarIcon } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Avatar.module.scss';

const Avatar = ({
  onClick,
  avatar = '',
  firstName,
  lastName,
  isProfile = false,
  isWhite = false,
  size = 40,
}) => {
  const classes = classNames({
    [styles.avatar]: true,
    [styles.profile]: isProfile,
    [styles.white]: isWhite,
  });

  return (
    <AvatarIcon
      className={classes}
      sx={{ width: size, height: size }}
      src={avatar}
      alt="avatar"
      onClick={onClick}
    >
      {avatar === '' &&
        firstName &&
        lastName &&
        `${firstName[0]}${lastName[0]}`}
    </AvatarIcon>
  );
};

Avatar.propTypes = {
  onClick: PropTypes.func,
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  isProfile: PropTypes.bool,
  isWhite: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Avatar;
