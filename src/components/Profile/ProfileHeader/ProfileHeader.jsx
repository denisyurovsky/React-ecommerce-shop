import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { Title } from '../../../components/Title/Title';
import { pathNames } from '../../../helpers/constants/pathNames/pathNames';

import styles from './ProfileHeader.module.scss';

function ProfileHeader({ profile, title }) {
  const { id, firstName, lastName } = profile;

  const links = [
    { url: '/', text: 'Home' },
    { url: pathNames.USERS, text: 'Users' },
    {
      url: `${pathNames.USERS}/${id}`,
      text: title ? title : `${firstName} ${lastName}`,
    },
  ];

  return (
    <>
      <Breadcrumbs className={styles.breadcrumbs} links={links} />

      <Title>{title ? title : `Profile of ${firstName} ${lastName}`}</Title>
    </>
  );
}

ProfileHeader.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
};

export default ProfileHeader;
