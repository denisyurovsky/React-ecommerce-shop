import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { KEYS } from '../../helpers/constants/constants';
import makeLogout from '../../helpers/makeLogout';
import { setUserInitialState } from '../../store/user/userSlice';
import Avatar from '../ui-kit/Avatar/Avatar';

import styles from './ProfileMenu.module.scss';

export const ProfileMenu = () => {
  const [isOpened, setIsOpened] = useState(false);
  const anchorRef = useRef(null);
  const { avatar, id: userId } = useSelector((state) => state.user.user);

  const handleToggle = () => {
    setIsOpened(!isOpened);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setIsOpened(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setIsOpened(false);
    } else if (event.key === KEYS.ESCAPE) {
      setIsOpened(false);
    }
  };

  const prevIsOpenedRef = useRef(isOpened);

  useEffect(() => {
    if (prevIsOpenedRef.current === true && isOpened === false) {
      anchorRef.current.focus();
    }

    prevIsOpenedRef.current = isOpened;
  }, [isOpened]);

  const dispatch = useDispatch();

  function getLogout(event) {
    handleClose(event);
    dispatch(setUserInitialState());
    makeLogout();
  }

  return (
    <div className={styles.container}>
      <Button
        size="small"
        data-testid="btn-profile"
        ref={anchorRef}
        color="secondary"
        id="composition-button"
        aria-controls={'composition-menu'}
        aria-expanded={isOpened}
        aria-haspopup="true"
        className={styles.expandButton}
        onClick={handleToggle}
      >
        <Avatar isWhite avatar={avatar} />
      </Button>
      <Popper
        className={styles.menuContainer}
        open={isOpened}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={isOpened}
              id="composition-menu"
              data-testid="menuList"
              aria-labelledby="composition-button"
              onKeyDown={handleListKeyDown}
            >
              <MenuItem onClick={handleClose}>
                <Link to={`/users/${userId}`}>
                  <PersonIcon color="primary" className={styles.image} />
                  <span>My Profile</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to={'/profile/wishlist'}>
                  <span>My Wishlist</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to={'/'}>
                  <span>My Orders</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to={'/'}>
                  <span>My Address book</span>
                </Link>
              </MenuItem>
              <MenuItem onClick={getLogout}>
                <MeetingRoomIcon color="primary" className={styles.image} />
                <span>Log out</span>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};
