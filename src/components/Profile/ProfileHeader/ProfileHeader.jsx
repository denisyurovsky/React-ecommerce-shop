import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { Title } from '../../../components/Title/Title';
import { LINKS } from '../../../constants/linkConstants';

import styles from './ProfileHeader.module.scss';

const { HOME, USERS, PROFILE } = LINKS;
const links = [HOME, USERS];

function ProfileHeader({ profile, title }) {
  const [header, setHeader] = useState('');

  useEffect(() => {
    if (profile) {
      const { id, firstName, lastName } = profile;

      links[2] = {
        url: `${USERS.url}/${id}`,
        text: `${firstName} ${lastName}`,
      };

      return setHeader(`Profile of ${firstName} ${lastName}`);
    }

    links[2] = PROFILE;
    setHeader(title);
  }, [profile, title]);

  return (
    <>
      <Breadcrumbs links={links} />

      <div className={styles.header}>
        <Title>{header}</Title>
      </div>
    </>
  );
}

ProfileHeader.propTypes = {
  title: PropTypes.string,
  profile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }),
};

export default ProfileHeader;
