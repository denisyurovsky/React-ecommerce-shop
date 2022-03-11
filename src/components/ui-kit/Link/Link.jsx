import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {
  Link as RouterLink,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';

import styles from './Link.module.scss';

const Link = ({
  to,
  children,
  state,
  style,
  color,
  opacity = 1,
  isWhite = false,
  isGrey = false,
  isUppercase = false,
  isCentered = false,
  isNav = false,
}) => {
  const resolved = useResolvedPath(to);
  let isActive = useMatch({ path: resolved.pathname, end: true }) && isNav;

  const classes = classNames({
    [styles.link]: true,
    [styles.white]: isWhite,
    [styles.grey]: isGrey,
    [styles.uppercase]: isUppercase,
    [styles.centered]: isCentered,
    [styles.active]: isActive,
  });

  return (
    <RouterLink
      to={to}
      className={classes}
      style={{
        ...style,
        color: color,
        opacity: opacity,
      }}
      state={state}
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
  state: PropTypes.object,
  style: PropTypes.object,
  color: PropTypes.string,
  opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isWhite: PropTypes.bool,
  isGrey: PropTypes.bool,
  isUppercase: PropTypes.bool,
  isCentered: PropTypes.bool,
  isNav: PropTypes.bool,
};

export default Link;
