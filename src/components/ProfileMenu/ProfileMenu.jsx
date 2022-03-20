import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Link from '../../components/ui-kit/Link/Link';
import { KEYS } from '../../constants/constants';
import { PROFILE_MENU, LINKS } from '../../constants/linkConstants';
import makeLogout from '../../helpers/makeLogout';
import Avatar from '../ui-kit/Avatar/Avatar';

import styles from './ProfileMenu.module.scss';

export const ProfileMenu = () => {
  const [isOpened, setIsOpened] = useState(false);
  const anchorRef = useRef(null);
  const { avatar } = useSelector((state) => state.user.user);

  const handleToggle = () => {
    setIsOpened(!isOpened);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setIsOpened(false);
  };

  const getLogout = (event) => {
    handleClose(event);
    makeLogout();
  };

  const handleListKeyDown = (event) => {
    if (event.key === KEYS.TAB) {
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
              {PROFILE_MENU.map(({ text, url, icon }) => (
                <MenuItem key={`menu_${text}`} onClick={handleClose}>
                  <Link to={url}>
                    <div className={styles.image}>{icon}</div>
                    <span className={styles.menuTitle}>My {text}</span>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem onClick={getLogout}>
                <Link to={LINKS.LOGOUT.url}>
                  <div className={styles.image}>{LINKS.LOGOUT.icon}</div>
                  <span className={styles.menuTitle}>{LINKS.LOGOUT.text}</span>
                </Link>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
};
