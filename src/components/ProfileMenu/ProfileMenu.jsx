import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './ProfileMenu.module.scss';

export const ProfileMenu = () => {
  const [isOpened, setIsOpened] = useState(false);
  const anchorRef = useRef(null);

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
    } else if (event.key === 'Escape') {
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
        <AccountCircleIcon className={styles.avatarImage} />
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
                <Link to={'/'}>
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
              <MenuItem onClick={handleClose}>
                <Link to={'/'}>
                  <MeetingRoomIcon color="primary" className={styles.image} />
                  <span>Log out</span>
                </Link>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};
