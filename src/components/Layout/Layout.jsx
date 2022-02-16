import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router';

import useBreakPoint from '../../hooks/useBreakPoint';
import ProfileMenuMobile from '../ProfileMenuMobile/ProfileMenuMobile';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

import styles from './Layout.module.scss';

export const Layout = ({ children }) => {
  const isLessThenBreakPoint = useBreakPoint();
  const { pathname } = useLocation();

  const isProfile = pathname.indexOf('/profile') >= 0;
  const isLogged = Boolean(localStorage?.accessToken);
  const isProfileMobile = isLogged && isProfile && isLessThenBreakPoint;

  const classes = classNames({
    [styles.container]: true,
    [styles.offset]: isProfileMobile,
  });

  return (
    <div className={classes}>
      <Header />
      {children}
      <Footer isProfileMobile={isProfileMobile} />
      {isProfileMobile && <ProfileMenuMobile />}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};
