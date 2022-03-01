import jwtDecode from 'jwt-decode';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getUser } from '../api/user';
import Spinner from '../components/ui-kit/Spinner/Spinner';
import { authStatus } from '../constants/authConstants';
import { CHECK_TOKEN_EXPIRATION_FREQUENCY } from '../constants/constants';
import makeLogout from '../helpers/makeLogout';
import {
  setUser,
  getLoginState,
  setLoginStatus,
} from '../store/user/userSlice';

const { PENDING, FULFILLED } = authStatus;

const withAuthExpiration = (Wrapped) => {
  return function WithAuthExpiration() {
    const loginStatus = useSelector(getLoginState);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [expTime, setExpTime] = useState(null);
    const [isExpired, setIsExpired] = useState(false);
    const [isExpiredSoon, setIsExpiredSoon] = useState(false);

    const dispatch = useDispatch();

    const handleClose = () => {
      makeLogout();
      setIsOpenModal(false);
    };

    const checkExpiration = useCallback(() => {
      const timeLeftMs = expTime - Date.now();

      if (timeLeftMs <= 0) {
        return setIsOpenModal(true);
      }
      const timeLeft = new Date(timeLeftMs);
      const isFiveMinutesBeforeExp = timeLeft.getMinutes() - 5 < 0;

      if (!isExpiredSoon && isFiveMinutesBeforeExp) {
        toast.info(`Your session expiries pretty soon.
             ${timeLeft.getMinutes()} minutes ${timeLeft.getSeconds()} seconds left.`);
        setIsExpiredSoon(true);
      }
    }, [expTime, isExpiredSoon]);

    const setUserToStore = useCallback(
      async (userId) => {
        dispatch(setLoginStatus(PENDING));
        const user = await getUser(userId);

        dispatch(setUser(user.data));
      },
      [dispatch]
    );

    useEffect(() => {
      let timerId = null;
      const { accessToken } = localStorage;

      if (!isExpired && accessToken) {
        const isLogged = loginStatus === FULFILLED;
        const token = jwtDecode(accessToken);

        setExpTime(token.exp * 1000);

        if (!isLogged) setUserToStore(token.sub);

        if (isLogged && expTime) {
          checkExpiration();
          timerId = setInterval(
            checkExpiration,
            CHECK_TOKEN_EXPIRATION_FREQUENCY
          );
        }
        if (isOpenModal) {
          clearInterval(timerId);
          setIsExpired(true);
        }
      }

      return () => {
        if (timerId) clearInterval(timerId);
      };
    }, [
      expTime,
      loginStatus,
      setIsExpired,
      isOpenModal,
      checkExpiration,
      isExpired,
      setUserToStore,
    ]);

    if (loginStatus === PENDING) {
      return <Spinner height="100vh" />;
    }

    return <Wrapped handleClose={handleClose} isOpenModal={isOpenModal} />;
  };
};

export default withAuthExpiration;
