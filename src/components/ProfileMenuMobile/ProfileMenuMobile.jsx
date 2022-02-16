import { Box } from '@mui/material';
import React from 'react';

import Link from '../../components/ui-kit/Link/Link';
import { PROFILE_MENU } from '../../helpers/constants/linkConstants';

import styles from './ProfileMenuMobile.module.scss';

const ProfileMenuMobile = () => (
  <Box className={styles.box}>
    <ul className={styles.list}>
      {PROFILE_MENU.map(({ text, url, icon }) => (
        <div key={`menu_mobile_${text}`} className={styles.listItem}>
          <Link to={url} isWhite isNav opacity={0.6}>
            <div className={styles.link}>
              {icon}
              <span className={styles.span}>{text}</span>
            </div>
          </Link>
        </div>
      ))}
    </ul>
  </Box>
);

export default ProfileMenuMobile;
