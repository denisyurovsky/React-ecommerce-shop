import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import ProfileAvatar from '../../components/Profile/ProfileAvatar/ProfileAvatar';
import ProfileLayout from '../../components/Profile/ProfileLayout/ProfileLayout';
import checkEmailValidity from '../../helpers/checkEmailValidity';
import { ERROR } from '../../helpers/constants/constants';
import { LINKS } from '../../helpers/constants/linkConstants';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { getUser, updateUser } from '../../store/user/userSlice';

import ProfileEditButtons from './ProfileEditButtons/ProfileEditButtons';
import ProfileFields from './ProfileFields/ProfileFields';

import styles from './ProfilePrivatePage.module.scss';

function ProfilePrivate() {
  const [disabled, setDisabled] = useState(true);
  const [isEmailWrong, setIsEmailWrong] = useState(false);

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    id: null,
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: null,
    phoneNumber: '',
    avatar: '',
    email: '',
  });

  useEffect(() => {
    setIsEmailWrong(!checkEmailValidity(profile.email));
  }, [profile]);

  useEffect(() => {
    setProfile({ ...profile, ...user });
  }, [user]); // eslint-disable-line

  const isEditionValid = () =>
    profile.firstName.length && profile.lastName.length && !isEmailWrong;

  const cancelEdition = () => {
    setProfile({ ...profile, ...user });
    setDisabled(true);
  };

  const handleEdition = () => {
    if (isEditionValid()) {
      dispatch(updateUser(profile));
      setDisabled(true);
    } else {
      toast.error(ERROR.INVALID_FIELDS);
      cancelEdition();
    }
  };

  if (user.id === null) {
    return <NotFoundPage />;
  }

  return (
    <ProfileLayout title={LINKS.PROFILE.text}>
      <div className={styles.container}>
        <ProfileAvatar id={profile.id} avatar={profile.avatar} />

        <div className={styles.fields}>
          <ProfileFields
            profile={profile}
            setProfile={setProfile}
            disabled={disabled}
            isEmailWrong={isEmailWrong}
          />

          <ProfileEditButtons
            disabled={disabled}
            setDisabled={setDisabled}
            handleEdition={handleEdition}
            cancelEdition={cancelEdition}
          />
        </div>
      </div>
    </ProfileLayout>
  );
}

export default ProfilePrivate;
