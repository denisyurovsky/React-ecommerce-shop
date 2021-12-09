import { Box } from '@mui/system';
import React from 'react';

import { HomePageContent } from '../../components/HomePageContent/HomePageContent';

import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <Box className={styles.container}>
      <HomePageContent />
    </Box>
  );
};
