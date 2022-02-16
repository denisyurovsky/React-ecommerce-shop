import { Card, MenuItem, MenuList } from '@mui/material';
import React, { useEffect, useState } from 'react';

import Link from '../../../components/ui-kit/Link/Link';
import { PROFILE_MENU_FROM_TOP } from '../../../helpers/constants/constants';
import { PROFILE_MENU } from '../../../helpers/constants/linkConstants';

import styles from './ProfileSidebar.module.scss';

const ProfileSidebar = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const scrollHandler = window.addEventListener('scroll', () => {
      if (isMounted) {
        if (!isFixed && window.scrollY >= PROFILE_MENU_FROM_TOP) {
          setIsFixed(true);
        }
        if (isFixed && window.scrollY < PROFILE_MENU_FROM_TOP) {
          setIsFixed(false);
        }
      }
    });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      isMounted = false;
    };
  }, [isFixed]);

  return (
    <Card className={styles.container}>
      <MenuList
        className={isFixed ? styles.menuList : ''}
        id="composition-menu"
        data-testid="menuList"
      >
        {PROFILE_MENU.map(({ text, url, icon }) => (
          <MenuItem key={`sidebar_${text}`}>
            <Link to={url} isGrey isNav>
              {icon}
              <span className={styles.menuTitle}>My {text}</span>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Card>
  );
};

export default ProfileSidebar;
