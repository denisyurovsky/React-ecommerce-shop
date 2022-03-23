import { Card, Container } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import useBreakPoint from '../../../hooks/useBreakPoint';
import ProfileHeader from '../../Profile/ProfileHeader/ProfileHeader';
import ProfileSidebar from '../../Profile/ProfileSidebar/ProfileSidebar';

import styles from './ProfileLayout.module.scss';

const ProfileLayout = ({ children, title }) => {
  const isLessThenBreakPoint = useBreakPoint();

  return (
    <div className={styles.wrapper}>
      <ProfileHeader title={title} />

      <Container className={styles.container}>
        {!isLessThenBreakPoint ? (
          <>
            <ProfileSidebar />
            <Card className={styles.profile}>{children}</Card>
          </>
        ) : (
          <> {children} </>
        )}
      </Container>
    </div>
  );
};

ProfileLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
};

export default ProfileLayout;
