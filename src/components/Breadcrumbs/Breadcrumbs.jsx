import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Breadcrumbs.module.scss';

export default function BasicBreadcrumbs({ links }) {
  return (
    <div role="presentation" className={styles.breadcrumbs}>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map(({ url, text }) => (
          <Link key={url} underline="hover" color="inherit" href={url}>
            {text}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}

BasicBreadcrumbs.propTypes = {
  links: PropTypes.array.isRequired,
};
