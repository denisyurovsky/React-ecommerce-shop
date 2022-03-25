import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';

import { getUser as fetchUser } from '../../api/user';
import ProfileConsumer from '../../components/Profile/ProfileConsumer/ProfileConsumer';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import ProfileSeller from '../../components/Profile/ProfileSeller/ProfileSeller';
import Spinner from '../../components/ui-kit/Spinner/Spinner';
import { pathNames } from '../../constants/pathNames';
import { getUser } from '../../store/user/userSlice';
import { Role } from '../../ts/enums/enums';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

import styles from './ProfilePage.module.scss';

function ProfilePage() {
  const { id: routeId } = useParams();
  const user = useSelector(getUser);
  const { isLoading } = useSelector((state) => state.user);

  const [profile, setProfile] = useState({});
  const [pageNotFound, setPageNotFound] = useState(false);

  const { role } = profile;
  const isOwner = routeId == user.id;
  const isSeller = !isOwner && role === Role.Seller;
  const isConsumer = !isOwner && role === Role.Consumer;

  useEffect(() => {
    let isMounted = true;

    const getUserById = async (userId) => {
      try {
        const newUser = await fetchUser(userId);

        if (isMounted) setProfile(newUser.data);
      } catch (err) {
        if (isMounted) setPageNotFound(true);
      }
    };

    if (!isOwner) {
      getUserById(routeId);
    }

    return () => {
      isMounted = false;
    };
  }, [routeId, isOwner]);

  if (pageNotFound) {
    return <NotFoundPage />;
  }

  if ((isLoading || !profile.id) && !isOwner) {
    return <Spinner height="90vh" />;
  }

  return (
    <div data-testid="profile" className={styles.container}>
      <ProfileHeader profile={profile} />
      {isOwner && <Navigate to={pathNames.PROFILE} replace />}
      {isSeller && <ProfileSeller profileId={profile.id} />}
      {isConsumer && <ProfileConsumer profileId={profile.id} />}
    </div>
  );
}

export default ProfilePage;
