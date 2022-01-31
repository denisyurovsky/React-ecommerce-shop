import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import styles from './Link.module.scss';

const Link = ({
  to,
  children,
  style,
  color,
  isWhite = false,
  isUppercase = false,
}) => {
  const classes = classNames({
    [styles.link]: true,
    [styles.white]: isWhite,
    [styles.uppercase]: isUppercase,
  });

  return (
    <RouterLink
      to={to}
      className={classes}
      style={{
        ...style,
        color: color,
      }}
    >
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
  color: PropTypes.string,
  isWhite: PropTypes.bool,
  isUppercase: PropTypes.bool,
};

export default Link;
